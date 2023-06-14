<template>
  <tr>
    <td><input type="checkbox" /></td>
    <td>{{ user.username }}</td>
    <td>{{ user.first_name + " " + user.last_name }}</td>
    <td>{{ user.address }}</td>
    <td>{{ user.postcode }}</td>
    <td>{{ user.contact_number }}</td>
    <td>{{ user.email }}</td>
    <td>
      <PencilIcon @click="showModal" />
      <DeleteIcon @click="removeUser" />
    </td>

    <div
      class="modal fade"
      id="user-update-modal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      ref="vuemodal"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Update {{ user.username }}
            </h5>
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
            <form @submit="UpdateUser">
              <div class="form-group">
                <input id="user-id" type="hidden" />
                <label class="col-sm-3 col-form-label">Username</label>
                <div class="col-sm-12">
                  <input
                    id="username-input"
                    type="text"
                    class="form-control"
                    placeholder="username"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">First Name</label>
                <div class="col-sm-12">
                  <input
                    id="first_name-input"
                    type="text"
                    class="form-control"
                    :class="{ 'is-invalid': errors.first_name }"
                    placeholder="first name"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Last Name</label>
                <div class="col-sm-12">
                  <input
                    id="last_name-input"
                    type="text"
                    class="form-control"
                    placeholder="last name"
                    :class="{ 'is-invalid': errors.last_name }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Address</label>
                <div class="col-sm-12">
                  <input
                    id="address-input"
                    type="text"
                    class="form-control"
                    placeholder="address"
                    :class="{ 'is-invalid': errors.address }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Post code</label>
                <div class="col-sm-12">
                  <input
                    id="postcode-input"
                    type="text"
                    class="form-control"
                    placeholder="postal code"
                    :class="{ 'is-invalid': errors.postcode }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-4 col-form-label">Contact Number</label>
                <div class="col-sm-12">
                  <input
                    id="phone-input"
                    type="text"
                    class="form-control"
                    placeholder="contact number"
                    :class="{ 'is-invalid': errors.contact_number }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Email</label>
                <div class="col-sm-12">
                  <input
                    id="email-input"
                    type="text"
                    class="form-control"
                    placeholder="email"
                    :class="{ 'is-invalid': errors.email }"
                  />
                </div>
              </div>
              <div class="form-group">
                <label class="col-sm-3 col-form-label">Password</label>
                <div class="col-sm-12">
                  <input
                    id="password-input"
                    type="text"
                    class="form-control"
                    placeholder="password"
                    :class="{ 'is-invalid': errors.password }"
                    @input="checkPasswordLength"
                  />
                </div>
              </div>
              <div class="form-group" v-show="passwordLength !== 0">
                <label class="col-sm-6 col-form-label">Confirm password</label>
                <div class="col-sm-12">
                  <input
                    id="password_confirmation-input"
                    type="text"
                    class="form-control"
                    placeholder="confirm password"
                    :class="{
                      'is-invalid': errors.password_confirmation,
                    }"
                  />
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
                <button type="submit" class="btn btn-primary">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </tr>
</template>


<script setup>
import DeleteIcon from "../icons/DeleteIcon.vue";
import PencilIcon from "../icons/PencilIcon.vue";
import { updateUser, deleteUser } from "../../http/user-api";
import { ref } from "vue";
import Swal from "sweetalert2";

const props = defineProps({
  user: Object,
  errors: Object,
});

const passwordLength = ref(0);

const checkPasswordLength = (event) => {
  passwordLength.value = event.target.value.length;
};

const showModal = () => {
  const modal = document.getElementById("user-update-modal");
  const bootstrapModal = new bootstrap.Modal(modal);

  const populateModalInputs = () => {
    const userId = document.getElementById("user-id");
    const usernameInput = document.getElementById("username-input");
    const firstNameInput = document.getElementById("first_name-input");
    const lastNameInput = document.getElementById("last_name-input");
    const postCodeInput = document.getElementById("postcode-input");
    const addressInput = document.getElementById("address-input");
    const emailInput = document.getElementById("email-input");
    const phoneInput = document.getElementById("phone-input");

    userId.value = props.user.id;
    usernameInput.value = props.user.username;
    firstNameInput.value = props.user.first_name;
    lastNameInput.value = props.user.last_name;
    postCodeInput.value = props.user.postcode;
    addressInput.value = props.user.address;
    emailInput.value = props.user.email;
    phoneInput.value = props.user.contact_number;
  };

  populateModalInputs();

  bootstrapModal.show();
};

const UpdateUser = async () => {
  try {
    const userId = document.getElementById("user-id").value;

    const details = {
      username: document.getElementById("username-input").value,
      first_name: document.getElementById("first_name-input").value,
      last_name: document.getElementById("last_name-input").value,
      address: document.getElementById("address-input").value,
      postcode: document.getElementById("postcode-input").value,
      contact_number: document.getElementById("phone-input").value,
      email: document.getElementById("email-input").value,
    };

    if (document.getElementById("password-input").value) {
      details.password = document.getElementById("password-input").value;
      details.password_confirmation = document.getElementById(
        "password_confirmation-input"
      ).value;
    }

    const data = await updateUser(userId, details);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: data.message,
    }).then(() => {
      location.reload();
    });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error.response.data.message,
      });
    }
  }
};

const removeUser = async () => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = deleteUser(props.user.id);
        Swal.fire({
          icon: "success",
          title: "Success",
          text: data.message,
        }).then(() => {
          location.reload();
        });
      }
    });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      Swal.fire({
        icon: "error",
        title: "error",
        text: error.response.data.message,
      });
    }
  }
};

const showConfirmPassword = () => {
  withPassword.value = true;
};
</script>