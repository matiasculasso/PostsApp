import React, { component, Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPosts } from '../actions';

class PostsNew extends Component {
    renderField(field) {
        const { meta : {touched, error } } = field;
        const formClasses = `form-group ${touched && error ? 'has-danger' : ''}`;

        return (
            <div className={formClasses} >
                <label>{field.label}</label>
                <input
                    className="form-control"
                    type="text"
                    {...field.input}
                />
                <div className="text-help" >
                {touched ? error : ''}
                </div>
            </div>
        );
    }

    onSubmit(values) {
        this.props.createPosts(values);
    }

    render() {
        const { handleSubmit } = this.props;

        return (            
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
                <Field
                    label="Title For Post" //this could be any name you wnt 
                    name="title"
                    component={this.renderField}
                />
                 <Field
                    label="Categories" 
                    name="categories"
                    component={this.renderField}
                />
                 <Field
                    label="Post Content" 
                    name="content"
                    component={this.renderField}
                />
                <button type="submit" className="btn btn-primary">Submit</button>
                <Link className="btn btn-danger" to="/" >Cancel</Link> 
            </form>                            
        );
    }
}

// this function will be called every time the user submit the form
// the function must return an object. If the object is empty, redux
// form asumes form is valid.
function validate(values) {
    // values => { title: 'asdad', categories: 'asdasd', content:'asdd'}
    const errors = {};
    //validate the input from 'values'

    if (!values.title) {
        errors.title = "Enter a title!";
    }
    if (values.title && values.title.length < 5 ) {
        errors.title = "Title must have more at less 5 characters!";
    }
    if (!values.categories) {
        errors.categories = "Enter a categorie!";
    }
    if (!values.content) {
        errors.content = "Enter a content!";
    }

    return errors;     
}

// this is similar to the connect redux helper
// this helper will allow redux form to communicate from the component to the reducer
// that we already set up  
export default reduxForm({
    // this is the form configuration
    form: 'PostsNewForm', // name of the form, must be unique in the entire app.
    validate
})(
    connect(null, {createPosts})(PostsNew)
);
