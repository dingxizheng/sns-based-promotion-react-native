/* 
* @Author: dingxizheng
* @Date:   2016-02-25 02:29:19
* @Last Modified by:   dingxizheng
* @Last Modified time: 2016-03-01 13:31:39
*/

/* @flow */
'use strict';

var React       = require('react-native');
var SearchList  = require('./SearchList');
var CommentView = require('../Views/CommentView');
var BusyBox     = require('../Parts/BusyBox');


var {Comment} = require('../apis');


var {
    StyleSheet,
    View,
    InteractionManager
} = React;

var CommnentList = React.createClass({

    getInitialState: function() {

        this.per_page = 10;
        this.sortBy = '-created_at';

        return {
            dataList: [],
            initialQuery: this.props.initialQuery || {},
            customQuery: {},
            haveMore: true,
            loadingNext: true,
            page: 1
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            initialQuery: nextProps.initialQuery 
        });
    },

    componentDidMount: function() {
        InteractionManager.runAfterInteractions(() => {
            this._loadData();
        });
    },

    _renderRow: function(rowData) {
        return <CommentView comment={rowData}/>
    },

    _loadData: function(endrefreshing) {
        Comment.fetchAll(Object.assign({}, this.state.initialQuery, 
            this.state.customQuery), { headers: { page: 1, per_page: this.per_page, sortBy: this.sortBy}})
            .then((list) => {
               this.setState({ 
                    dataList: list,
                    loadingNext: false,
                    haveMore: list.length < this.per_page ? false : true,
                    page: 1
                });
               endrefreshing();
            })
            .catch((e) => {
               endrefreshing();
            });
    },

    _loadNext: function() {
        Comment.fetchAll(Object.assign({}, this.state.initialQuery, 
            this.state.customQuery), { headers: { page: this.state.page, per_page: this.per_page, sortBy: this.sortBy}})
            .then((list) => {
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

    render: function() {
        return (
            <SearchList
                haveMore={this.state.haveMore}
                loadingNext={this.state.loadingNext}
                loadNext={this._loadNext}
                loadData={this._loadData}
                dataList={this.state.dataList}
                renderRow={this._renderRow}/>
        );
    }
});


var styles = StyleSheet.create({

});


module.exports = CommnentList;
