<template>
  <div class="container py-5" id="app">
    <div class="card">
      <div class="card-header">
        <h2>Manage users</h2>
      </div>
      <div class="card-body">
        <div class="row mb-3">
          <NewUser @added="handleAddedUser" :errors="errors" />
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
              <th><input type="checkbox"/></th>
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
            />
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
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { allUsers, createUser } from "../http/user-api";
import User from "../components/user/User.vue";
import NewUser from "../components/user/NewUser.vue";
import Swal from "sweetalert2";

const users = ref([]);
const errors = ref({});

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

</script>

