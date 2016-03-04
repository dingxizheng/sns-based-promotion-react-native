/* 
* @Author: dingxizheng
* @Date:   2016-02-01 02:59:09
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-03 21:39:23
*/

'use strict';
var React              = require('react-native');
var Actions            = require('react-native-router-flux').Actions;
var Icon               = require('react-native-vector-icons/MaterialIcons');
var theme              = require('../theme');
var CustomButtonsMixin = require('../CustomButtonsMixin');
var TimerMixin         = require('react-timer-mixin');
var PromotionCard      = require('./PromotionCardView');
var UserCard           = require('./UserCardView');
var BusyBox            = require('../Parts/BusyBox');
var SearchList         = require('../ListViews/SearchList');
var SubscribableCard   = require('../Parts/SubscribedPromotionView');
var LoadingView        = require('./LoadingView');

var {Promotion, Resource, Feeds} = require('../apis');

var {
	View, 
	Text, 
	StyleSheet, 
	TouchableOpacity,
	ActionSheetIOS,
	LayoutAnimation,
	InteractionManager
} = React;


var TimeLine = React.createClass({

	mixins: [CustomButtonsMixin, TimerMixin],

	getInitialState: function() {
		this.per_page = 10;
        this.sortBy = '-created_at';

        return {
            dataList: [],
            initialQuery: this.props.initialQuery || {},
            customQuery: { key: "promotion.created||promotion.reposted" },
            haveMore: true,
            loadingNext: true,
            page: 1,
            title: 'What\'s new',
            loading: false,
        };
	},

	rightButtonsDidMount: function() {
	},

	leftButtonsDidMount: function() {
		this.setRightButtons([
			{
				icon: 'search',
				onPress: this._openSearch
			},
			{
				icon: 'add',
				onPress: () => Actions.newPromotion()
			},
		]);
	},

	titleViewDidMount: function() {
        this.setTitleView(
        	<TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }} onPress={this._mainPageOptions}>
        		<Text style={{ color: theme.colors.BAR_TEXT, fontSize: 14, padding: 0,}}>{ this.state.title }</Text>
        		<Icon name="arrow-drop-down" size={15} style={{ color: 'white', padding: 0, margin: 0}}/>
        	</TouchableOpacity>
        );
    },

    _mainPageOptions: function() {
    	ActionSheetIOS.showActionSheetWithOptions({
	      title: "Groups",
	      blurBackground: true,
          options: [
            "What's new",
            "Matchers",
            "Cancel"
          ],
          cancelButtonIndex: 2,
        },
        (buttonIndex) => {
            if(buttonIndex === 1){
                this.setState({ 
                	customQuery: { key: "promotion.subscribable.new" },
                	title: 'Matchers',
                	loading: true,
                });
                this._loadData();
                this.titleViewDidMount();
            }

            if(buttonIndex === 0){
                this.setState({ 
                	customQuery: { key: "promotion.created||promotion.reposted" },
                	title: 'What\'s new',
                	loading: true,
                });
                this._loadData();
                this.titleViewDidMount();
            }
        });
    },

	_openSearch: function (argument) {
		Actions.autoComplete({ 
			rightButton: 'Add',
			content: require('../AutoComplete/Tags'),
			contentProps: { initialTags: ["oneeee"] }
		});
	},

	componentDidMount: function() {
		LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
		InteractionManager.runAfterInteractions(()=>{
			this._loadData();
		});  
    },

    _loadData: function(endrefreshing) {
    	// Feeds.fetchAll({ key: "promotion.subscribable.new" }).then((e) => {
    	// 	console.log(e);
    	// });
       	Feeds.fetchAll(Object.assign({}, this.state.initialQuery, 
            this.state.customQuery), { headers: { page: 1, per_page: this.per_page, sortBy: this.sortBy}})
            .then((list) => {
               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
               this.setState({ 
                    dataList: list,
                    loadingNext: false,
                    haveMore: list.length < this.per_page ? false : true,
                    page: 2,
                    loading: false,
                });
               endrefreshing();
            })
            .catch((e) => {
            	this.setState({ 
                    loading: false,
                });
               endrefreshing();
            });
    },

    _loadNext: function() {
        Feeds.fetchAll(Object.assign({}, this.state.initialQuery, 
            this.state.customQuery), { headers: { page: this.state.page, per_page: this.per_page, sortBy: this.sortBy}})
            .then((list) => {
               LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
               this.setState({ 
                    dataList: this.state.dataList.concat(list),
                    loadingNext: false,
                    haveMore: list.length < this.per_page ? false : true,
                    page: this.state.page + 1
                });
            })
            .catch((e) => {
               this.setState({ 
                    loadingNext: false,
                });
            });
    },


	_fetchCurrentLocation: function() {
	 // navigator.geolocation.getCurrentPosition(
	 //      (initialPosition) => { console.log(initialPosition) },
	 //      (error) => console.log(error.message),
	 //      {enableHighAccuracy: true, timeout: 20000, maximumAge: 0}
	 //    );
	},

	_renderRow: function(rowData) {
		
		// return <UserCard user={rowData}/>
		if (rowData.data.type === 'Promotion') {
			if (rowData.data.subscribable) {
				return <SubscribableCard subscribed={rowData.data}/>
			}

			return <PromotionCard promotion={new Promotion(rowData.data.result)}/>	
		}

		if (rowData.data.type === 'Comment') {
			return <View/>
		}
	},

	render: function() {
		return (
			<View style={styles.container}>
				<LoadingView isVisible={this.state.loading}/>
				<SearchList
					header={false}
	                haveMore={this.state.haveMore}
	                loadingNext={this.state.loadingNext}
	                loadNext={this._loadNext}
	                loadData={this._loadData}
	                dataList={this.state.dataList}
	                renderRow={this._renderRow}/>
		  	</View>
		);
	}

});

var styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: 64,
		flexDirection: 'column',
		backgroundColor: '#eeeeee'
	},
	listView: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#eeeeee'
	}
});

module.exports = TimeLine;