<template>
  <div class="container py-5" id="app">
    <div class="card">
      <div class="card-header">
        <h2>Manage users</h2>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-md-3">
            <a href="#" class="btn btn-primary" @click="showModal">
              <i class="fas fa-plus-circle"></i> Add New
            </a>
          </div>
          <div class="col-md-9">
            <div class="form-inline justify-content-end">
              <div class="form-group">
                <!-- FOR SEARCH FUNCTION -->
                <div class="input-group">
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search..."
                  />
                  <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="fas fa-sync-alt"></i>
                    </button>
                    <button class="btn btn-outline-secondary" type="button">
                      <i class="fas fa-search"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Address</th>
              <th>Postcode</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>johndoe</td>
              <td>John</td>
              <td>Doe</td>
              <td>9626 Conroy Hills Brandimouth</td>
              <td>2005</td>
              <td>09123456789</td>
              <td>johndoe@mail.com</td>
              <td>
                <a href="#" class="btn btn-sm btn-outline-secondary">
                  <i class="fas fa-edit"></i>
                </a>

                <a href="#" class="btn btn-sm btn-outline-danger">
                  <i class="fas fa-times"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- FOR PAGINATION FUNCTION -->
      <div class="card-footer">
        <nav>
          <ul class="pagination justify-content-center">
            <li class="page-item">
              <a class="page-link">First</a>
            </li>
            <li class="page-item">
              <a class="page-link">1</a>
            </li>
            <li class="page-item">
              <a class="page-link">2</a>
            </li>
            <li class="page-item">
              <a class="page-link">3</a>
            </li>
            <li class="page-item"><a class="page-link">Last</a></li>
          </ul>
        </nav>
      </div>
    </div>

    <!-- Modal -->
    <div
      class="modal fade"
      id="user-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="vuemodal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Modal tittle</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Username</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="username"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">First Name</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="first name"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Last Name</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="last name"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Address</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="address"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Post code</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="postal code"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Phone</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="phone"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="email"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Password</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="password"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-6 col-form-label">Confirm password</label>
                <div class="col-sm-12">
                  <input type="text" class="form-control" placeholder="confirm password"/>
                  <span class="invalid-feedback">Errors</span>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button type="button" class="btn btn-primary">
              Save or update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    showModal() {
      const modal = document.getElementById("user-modal");
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    },
  },
};
</script>
