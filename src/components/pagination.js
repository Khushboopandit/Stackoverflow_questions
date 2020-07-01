// Imports
import React, { Component } from "react";
import "../css/main.css";
import ReactPaginate from "react-paginate";

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCount: 3,
      startPage: 0,
      itemsPerPage: 6,
    };
  }
//   handle clicked page 
  handlePageClick = (data) => {
    this.setState({ startPage: data.selected });
  };
//   On data change reset page count
  changePageCount = (full_data) => {
    let itemsInPage = parseInt(this.state.itemsPerPage);
    if (
      Math.ceil(full_data.length > 0 && full_data.length / itemsInPage) !=
      this.state.pageCount
    ) {
      this.setState({
        pageCount: Math.ceil(full_data.length / itemsInPage),
      });
    }
  };

//   Before rendering data divide it with items per page
  getRenderData = () => {
    let visible_data = [],
      full_data = this.props.searched_data;
    this.changePageCount(full_data);
    let offset = Math.ceil(this.state.startPage * this.state.itemsPerPage);
    for (var i = 0; i < full_data.length; i++) {
      if (i >= offset && i < offset + this.state.itemsPerPage) {
        visible_data.push(full_data[i]);
      }
    }
    return visible_data;
  };
  render() {
    return (
      <div className="container">
        <div className="row mt-4">
            {/* Looping */}
          {this.getRenderData().map((item, index) => (
            <div className="col-md-6 col-6 mb-3">
              <div class="card">
                <div class="card-header">
                  <span className="d-flex">
                    <img
                      className="rounded-circle mr-2 profile-img"
                      src={item.owner.profile_image}
                      alt="profile"
                    />
                    <p className="mb-0 align-self-center ">
                      <h5 class="mb-0 card-title">{item.owner.display_name}</h5>
                      <a href={item.owner.link} class="card-text">
                        Check profile
                      </a>
                    </p>
                  </span>
                </div>
                <div class="card-body">
                  <a href={item.link} target="blank" class="btn btn-info">
                    Go to solution
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
        {this.props.searched_data.length == 0 ? (
          <div class="alert alert-info font-weight-bold" role="alert">
            No Data
          </div>
        ) : (
          <div className="float-right mt-4">
              {/* Execute pagination */}
            <ReactPaginate
              previousLabel={"Previous"}
              nextLabel={"Next"}
              breakLabel={"..."}
              breakClassName={"break-me"}
              pageCount={this.state.pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              subContainerClassName={"pages pagination"}
              activePage={this.state.startPage}
              initialPage={this.state.startPage}
              containerClassName={"pagination"}
              pageClassName={"page-item"}
              pageLinkClassName={"page-link"}
              activeClassName={"active"}
              previousClassName={"page-item"}
              previousLinkClassName={"page-link"}
              nextClassName={"page-item"}
              nextLinkClassName={"page-link"}
              breakClassName={"page-item"}
              breakLinkClassName={"page-link"}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Pagination;
