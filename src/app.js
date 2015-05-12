var MultiSelect = React.createClass({
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
            <input onChange={this.changeHandler} type="checkbox" checked={selected} className="multi-select" />
        );
    }
});

var ShowSelected = React.createClass({
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
            <button onClick={this.clickHandler} className="btn btn-default action-button" type="submit">Show selected id's</button>
        );
    }
});

var Table = React.createClass({
    changeHandler: function(e) {
        if (typeof this.props.onChange === 'function') {
            this.props.onChange(e.target.value, e.target.checked);
        }
    },
    render: function () {
        return (
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                     {this.props.items.map(function(item) {
                         return (
                             <tr key={item.id}>
                                 <th scope="row">
                                     <input onChange={this.changeHandler} checked={item.selected} type="checkbox" value={item.id} />
                                 </th>
                                 <td>{item.firstName}</td>
                                 <td>{item.lastName}</td>
                                 <td>{item.userName}</td>
                             </tr>
                         );
                     }, this)}
                </tbody>
            </table>
        );
    }
});

var App = React.createClass({
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
            <div className="panel panel-default">
                <div className="panel-heading">
                    <MultiSelect items={this.state.items} onChange={this.changeAllHandler} />
                    <ShowSelected items={this.state.items} />
                </div>
                <div className="panel-body">
                    <Table items={this.state.items}  onChange={this.changeHandler} />
                </div>
            </div>
        );
    }
});

React.render(<App />, document.getElementById("app"));