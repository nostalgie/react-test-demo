var MultiSelect = React.createClass({displayName: "MultiSelect",
    changeHandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.checked);
        }
    },
    render: function () {
        var selected = true;
        this.props.items.forEach(function(item){
            if (!item.selected) {
                selected = false;
            }
        });
        return (
            React.createElement("input", {onChange: this.changeHandler, type: "checkbox", checked: selected, className: "multi-select"})
        );
    }
});

var ShowSelected = React.createClass({displayName: "ShowSelected",
    clickHandler: function() {
        var selected = [];
        this.props.items.forEach(function(item){
           if (item.selected) {
               selected.push(item.id);
           }
        });
        console.log(selected);
    },
    render: function () {
        return (
            React.createElement("button", {onClick: this.clickHandler, className: "btn btn-default action-button", type: "submit"}, "Show selected id's")
        );
    }
});

var Table = React.createClass({displayName: "Table",
    changeHandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value, e.target.checked);
        }
    },
    render: function () {
        return (
            React.createElement("table", {className: "table"}, 
                React.createElement("thead", null, 
                    React.createElement("tr", null, 
                        React.createElement("th", null, "#"), 
                        React.createElement("th", null, "First Name"), 
                        React.createElement("th", null, "Last Name"), 
                        React.createElement("th", null, "Username")
                    )
                ), 
                React.createElement("tbody", null, 
                     this.props.items.map(function(item) {
                         return (
                             React.createElement("tr", {key: item.id}, 
                                 React.createElement("th", {scope: "row"}, 
                                     React.createElement("input", {onChange: this.changeHandler, checked: item.selected, type: "checkbox", value: item.id})
                                 ), 
                                 React.createElement("td", null, item.firstName), 
                                 React.createElement("td", null, item.lastName), 
                                 React.createElement("td", null, item.userName)
                             )
                         );
                     }, this)
                )
            )
        );
    }
});

var App = React.createClass({displayName: "App",
    getInitialState: function() {
        return {
            items: []
        };
    },
    componentWillMount: function () {
        $.get("source/data.json").done(function (data) {
            this.setState({items: data});
        }.bind(this)).fail(function (error, a, b) {
            console.log("Error loading JSON");
        });
    },
    changeAllHandler: function(checked) {
        var items = this.state.items.map(function(item){
            item.selected = checked;
            return item;
        });
        this.setState({
            items: items
        })
    },
    changeHandler: function(id, checked) {
        var items = this.state.items.map(function(item){
            if (id == item.id) {
                item.selected = checked;
            }
            return item;
        });
        this.setState({
            items: items
        })
    },
    render: function () {
        return (
            React.createElement("div", {className: "panel panel-default"}, 
                React.createElement("div", {className: "panel-heading"}, 
                    React.createElement(MultiSelect, {items: this.state.items, onChange: this.changeAllHandler}), 
                    React.createElement(ShowSelected, {items: this.state.items})
                ), 
                React.createElement("div", {className: "panel-body"}, 
                    React.createElement(Table, {items: this.state.items, onChange: this.changeHandler})
                )
            )
        );
    }
});

React.render(React.createElement(App, null), document.getElementById("app"));