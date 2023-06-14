<template>
  <div class="col-md-3">
    <a href="#" class="btn btn-primary" @click="showModal">
      <i class="fas fa-plus-circle"></i> Add New
    </a>
  </div>

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
          <h5 class="modal-title" id="exampleModalLabel">New User</h5>
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
          <form @submit="addNewUser" @keydown.enter="addNewUser">
            <div class="form-group">
              <label class="col-sm-3 col-form-label">Username</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="username"
                  :class="{ 'is-invalid': errors.username }"
                  v-model="newUser.username"
                />
                <span class="invalid-feedback" v-if="errors.username">{{
                  formatError(errors.username)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 col-form-label">First Name</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': errors.first_name }"
                  placeholder="first name"
                  v-model="newUser.first_name"
                />
                <span class="invalid-feedback" v-if="errors.first_name">{{
                  formatError(errors.first_name)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 col-form-label">Last Name</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="last name"
                  v-model="newUser.last_name"
                  :class="{ 'is-invalid': errors.last_name }"
                />
                <span class="invalid-feedback" v-if="errors.last_name">{{
                  formatError(errors.last_name)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 col-form-label">Address</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="address"
                  v-model="newUser.address"
                  :class="{ 'is-invalid': errors.address }"
                />
                <span class="invalid-feedback" v-if="errors.address">{{
                  formatError(errors.address)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 col-form-label">Post code</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="postal code"
                  v-model="newUser.postcode"
                  :class="{ 'is-invalid': errors.postcode }"
                />
                <span class="invalid-feedback" v-if="errors.postcode">{{
                  formatError(errors.postcode)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-4 col-form-label">Contact Number</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="contact number"
                  v-model="newUser.contact_number"
                  :class="{ 'is-invalid': errors.contact_number }"
                />
                <span class="invalid-feedback" v-if="errors.contact_number">{{
                  formatError(errors.contact_number)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 col-form-label">Email</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="email"
                  v-model="newUser.email"
                  :class="{ 'is-invalid': errors.email }"
                />
                <span class="invalid-feedback" v-if="errors.email">{{
                  formatError(errors.email)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-3 col-form-label">Password</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="password"
                  v-model="newUser.password"
                  :class="{ 'is-invalid': errors.password }"
                />
                <span class="invalid-feedback" v-if="errors.password">{{
                  formatError(errors.password)
                }}</span>
              </div>
            </div>
            <div class="form-group">
              <label class="col-sm-6 col-form-label">Confirm password</label>
              <div class="col-sm-12">
                <input
                  type="text"
                  class="form-control"
                  placeholder="confirm password"
                  v-model="newUser.password_confirmation"
                  :class="{ 'is-invalid': errors.password_confirmation }"
                />
                <span
                  class="invalid-feedback"
                  v-if="errors.password_confirmation"
                  >{{ formatError(errors.password_confirmation) }}</span
                >
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
                @click="resetErrors"
              >
                Close
              </button>
              <button type="submit" class="btn btn-primary">Add</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { reactive, ref } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  user: Object,
  errors: Object,
});

const newUser = reactive({
  first_name: "",
  last_name: "",
  address: "",
  postcode: "",
  contact_number: "",
  email: "",
  username: "",
  password: "",
  password_confirmation: "",
});

const emit = defineEmits(["added"]);

const showModal = () => {
  const modal = document.getElementById("user-modal");
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
};

const formatError = (error) => {
  if (Array.isArray(error)) {
    return error.join(", ");
  }
  return error;
};

const resetErrors = () => {
  Object.keys(props.errors).forEach((key) => {
    props.errors[key] = "";
  });
};

const addNewUser = (event) => {
  event.target.value = "";
  emit("added", newUser);
};
</script>