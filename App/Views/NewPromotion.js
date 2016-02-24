/* 
* @Author: dingxizheng
* @Date:   2016-02-17 16:00:47
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-02-23 20:20:16
*/

'use strict';

var React              = require('react-native');
var Icon               = require('react-native-vector-icons/MaterialIcons');
var theme              = require('../theme');
// var KeyboardSpacer     = require('react-native-keyboard-spacer');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TagsView           = require('./TagsView');
var EditImages         = require('./EditImagesView');
var LoadingView        = require('./LoadingView');
var Actions            = require('react-native-router-flux').Actions;
var TableView          = require('react-native-tableview');
var Section            = TableView.Section;
var Item               = TableView.Item;
var Cell               = TableView.Cell;

var {
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    TextInput, 
    ScrollView
} = React;

var {Promotion, Resource, uploadImage, Feeds} = require('../apis');

var NewPromotion = React.createClass({
    mixins: [CustomButtonsMixin],

    getInitialState: function() {
        return {
            loading: false,
            tags: ["promotion"],
        };
    },

    rightButtonsDidMount: function() {
        this.setRightButtons([
            {
                text: 'Post',
                onPress: this._postPromotion
            }
        ]);
    },

    leftButtonsDidMount: function() {
        this.setLeftButtons([
            {
                icon: 'close',
                onPress: Actions.pop
            }
        ]);
    },

    _postPromotion: async function() {
        this.setState({loading: true});
        try {
            var promotion = new Promotion({
                body: this.body,
                tags: this.tags,
                price: this.price
            });

            var result = await promotion.save();
            
            var images = await this.images.reduce(async function(sum, img) {
                var image = await uploadImage(img.uri);
                var sum = await sum;
                sum.push(JSON.parse(image.data).image);
                return sum;
            }, []);

            if (images.length > 0)
                await promotion.set({ photos: images }).save();

            Actions.pop();
        
        } catch(e) {
            console.log(e);
        }
        this.setState({loading: false});
    },

    _tagsChange: function(tags) {
        this.tags = tags;
        this.setState({
            tags: tags
        });
    },

    _imagesChange: function(images) {
        this.images = images;
    },

    _onKeyPress: function(e) {
        if (e.nativeEvent.key === 'Enter')
            this._postPromotion();
    },

    _onChangeText: function(e) {
        this.body = e;
    },

    _onChangePirce: function(e) {
        this.price = e;
    },

    _editTags: function() {
        Actions.autoComplete({ 
                    rightButton: 'Add',
                    content: require('../AutoComplete/Tags'),
                    contentProps: { 
                        initialTags: this.state.tags,
                        onTagsChange: this._tagsChange
                    }
                });

    },

    render: function() {
        return (
            <View style={styles.container}>
            <TableView
               style={{flex: 1}}
               allowsToggle={true}
               allowsMultipleSelection={false}
               tableViewStyle={TableView.Consts.Style.Grouped}
               tableViewCellStyle={TableView.Consts.CellStyle.Subtitle}
               separatorStyle={TableView.Consts.SeparatorStyle.None}>

                <Section label="">
                    <Cell disable={true}>
                        <TextInput
                            onKeyPress={this._onKeyPress}
                            onChangeText={this._onChangeText} 
                            style={styles.contentInput}
                            autoCorrect={false}
                            autoCapitalize="none"
                            returnKeyType="send"
                            maxLength={400}
                            multiline={true} 
                            autoFocus={true} 
                            placeholder={ "promote what you have..." }/>
                    </Cell>

                    <Cell disable={true}>
                        <Text style={styles.label}>Photos</Text>
                    </Cell>
                    <Cell arrow={false} disable={true}>
                        <View style={[styles.cell]}>
                            <EditImages 
                                style={{backgroundColor: 'white', margin: 10, marginTop: 6}} 
                                columns={4}
                                square={true} 
                                imageHeight={100} 
                                imagesChange={this._imagesChange}/>
                        </View>
                    </Cell>

                    <Cell disable={true}>
                        <Text style={styles.label}>Price</Text>
                    </Cell>
                    <Cell arrow={false}>
                        <View style={[styles.cell]}>
                            <TextInput onChangeText={ this._onChangePirce } 
                                style={styles.priceInput} 
                                multiline={false}
                                placeholder={ "price..." }/>
                        </View>
                    </Cell>

                    <Cell disable={true}>
                        <Text style={styles.label}>Tags</Text>
                    </Cell>
                    <Cell arrow={true} onPress={this._editTags}>
                        <View style={[styles.cell]}>
                            {function () {
                                if (this.state.tags.length > 0)
                                    return <TagsView
                                            style={{ margin:10, marginBottom: 8 }}
                                            onPress={(tag, i) => console.log(tag, i)}
                                            onMore={() => console.log("more")}
                                            tags={this.state.tags}/>
                                else
                                    return <Text style={styles.cellText}>Add tags...</Text>
                            }.bind(this).call()}
                        </View>
                    </Cell>

                </Section>

            </TableView>
            </View>
        );
    }
});


var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        backgroundColor: '#EdEdEd',
        left: 0,
        right: 0,
        bottom: 0,
        top: 64,
        paddingTop: 8,
    },
    label: {
        height: 40,
        fontSize: 15,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 6,
        color: theme.colors.GREY_FONT,
        // backgroundColor: '#eee'
    },
    cell: {
        backgroundColor: 'white',
    },
    cellText: {
        fontSize: 15,
        padding: 10,
        color: theme.colors.GREY_FONT,
    },
    content: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#eee'
    },
    promotionBody: {
        backgroundColor: '#fff',
        marginVertical: 5
    },
    contentInput: {
        backgroundColor: '#fff',
        height: 100,
        fontSize: 17,
        padding: 10,
        color: theme.colors.DARK_GREY_FONT,
    },
    priceInput: {
        flex: 1,
        height: 40,
        fontSize: 17,
        padding: 10,
        color: theme.colors.DARK_GREY_FONT,
    },
    footer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: '#eeeeee',
        borderTopColor: '#eeeeee',
        borderTopWidth: .5
    },
    footerMenuItemWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    footerMenuItemIcon: {
        color: theme.colors.GREY_FONT,
        fontSize: 22,
        padding: 3
    },
    footerMenuItemText: {
        color: theme.colors.GREY_FONT,
        fontSize: 13,
        padding: 3,
        paddingRight: 10,
    },
});

module.exports = NewPromotion;
