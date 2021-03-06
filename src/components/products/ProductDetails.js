import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import EditProduct from "./EditProduct";


class ProductDetails extends Component {

  renderEditForm = () => {
    // if (this.props.requestedProduct.name {
    return (
      <EditProduct
        updateThestate={this.props.updateTheState()}
        theProduct={this.props.requestedProduct}
        {...this.props}
      />
    );
  // }
};

  deleteProduct = () => {
    const { params } = this.props.match;
    axios
      .delete(`${process.env.REACT_APP_API_URL}/products/${params.id}`, {
        withCredentials: true,
      })
      .then(() => {
        this.props.updateTheState();
        this.props.history.push("/shop");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  handleToCartBtn = (event) => {
    event.preventDefault();
    this.props.addToCart(this.props.requestedProduct);
  };

  adminCheck = () => {
    const currentUserIsAdmin = this.props.user && this.props.user.isAdmin;
    if (currentUserIsAdmin) {
      return (
        <>
          <div>{this.renderEditForm()}</div>
          <div>
            <button
              className="button is-normal is-danger delete-btn"
              onClick={() =>
                this.deleteProduct(this.props.requestedProduct._id)
              }
            >
              Delete product
            </button>
          </div>
        </>
      );
    }
  };

  render() {
    return (
      <>
        <hr className="hr-line" />
        {this.props.requestedProduct && (
          <div className="product-detail">
            <div>
              <img src={this.props.requestedProduct.image} />
            </div>
            <div className="product-info">
              <h1>{this.props.requestedProduct.name}</h1>
              <p>{this.props.requestedProduct.price} €</p>

              <br />
              <button
                className="button is-normal is-info"
                onClick={this.handleToCartBtn}
              >
                Add In Cart
              </button>
              <br />
              <p>{this.props.requestedProduct.description}</p>
              <hr />
              <Link to={"/shop"}>Back to products</Link>
            </div>
          </div>
        )}
        <div> {this.adminCheck()} </div>
      </>
    );
  }
}

export default ProductDetails;
