<template>
  <div class="container py-5" id="app">
    <div class="card">
      <div class="card-header">
        <h2>Manage users</h2>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <div class="col-sm-3" v-if="selectedUsers.length > 0">
            <button class="btn btn-danger" @click="deleteUsers">
              <i class="fas fa-minus-circle"></i> Delete
            </button>
          </div>
          <NewUser
            v-if="selectedUsers.length == 0"
            @added="handleAddedUser"
            :errors="errors"
          />
          <div class="col-md-9">
            <div class="form-inline justify-content-end">
              <div class="form-group">
                <!-- FOR SEARCH FUNCTION -->
                <!-- <div class="input-group">
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
                </div> -->
              </div>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <thead>
            <tr>
              <th>
                <div class="form-check form-switch">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    role="switch"
                    @change="handleAllCheckboxChange"
                  />
                </div>
              </th>
              <th>Username</th>
              <th>Full Name</th>
              <th>Address</th>
              <th>Postcode</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <User
              v-for="user in users"
              :user="user"
              :key="user.id"
              :errors="errors"
              :selectedUsers="selectedUsers"
            />
          </tbody>
        </table>
      </div>
      <!-- FOR PAGINATION FUNCTION -->
      <!-- <div class="card-footer">
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
      </div> -->
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { allUsers, bulkDeleteUsers, createUser } from "../http/user-api";
import User from "../components/user/User.vue";
import NewUser from "../components/user/NewUser.vue";
import Swal from "sweetalert2";

const users = ref([]);
const errors = ref({});
const selectedUsers = ref([]);

onMounted(async () => {
  const { data } = await allUsers();
  users.value = data.data.data;
});

const handleAddedUser = async (NewUser) => {
  try {
    const { data: createdUser } = await createUser(NewUser);
    users.value.unshift(createdUser.data);

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "User added successfully",
    }).then(() => {
      location.reload();
    });
  } catch (error) {
    if (error.response && error.response.data.errors) {
      errors.value = error.response.data.errors;
    } else {
      errors.value = { message: "Server Error" };
    }
  }
};

const handleAllCheckboxChange = (event) => {
  if (event.target.checked) {
    // Filter out already selected users
    const newSelectedUsers = users.value
      .filter((user) => !selectedUsers.value.includes(user.id))
      .map((user) => user.id);
    selectedUsers.value = [...selectedUsers.value, ...newSelectedUsers];
  } else {
    selectedUsers.value = [];
  }
  console.log(selectedUsers.value, event.target.checked);
};

const deleteUsers = async () => {
  try {
    Swal.fire({
      title: "Are you sure?",
      text: "Users will be deleted permanently",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Delete",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = bulkDeleteUsers(selectedUsers.value);
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
</script>
