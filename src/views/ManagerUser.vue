<template>
  <div>
    <div class="d-flex justify-content-between mb-2">
      <div>
        <h3>Manager User</h3>
      </div>
      <div>
        <button
          type="button"
          class="btn btn-primary"
          @click="resetForm"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Add New User
        </button>
      </div>
    </div>
    <div class="d-flex justify-content-end mb-2">
      <input
        type="text"
        class="p-1"
        v-model="search"
        placeholder="Tìm kiếm theo email"
      />
    </div>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th scope="col">STT</th>
          <th scope="col">Name</th>
          <th scope="col">Gender</th>
          <th scope="col">DayOfBirth</th>
          <th scope="col">Email</th>
          <th scope="col">Option</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in filteredUsers" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.gender }}</td>
          <td>{{ user.dayOfBirth }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button
              class="btn btn-warning me-2"
              @click="handleEditUser(user.id)"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Edit
            </button>
            <button class="btn btn-danger" @click="handleDelete(user.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">
              {{ isEdit ? "Edit User" : "Add User" }}
            </h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              class="d-flex flex-column"
              @submit.prevent="handleCreateOrUpdate"
            >
              <label for="">Name:</label>
              <input type="text" v-model="dataUser.name" />
              <p v-if="errorName" class="text-danger">Name không hợp lệ</p>

              <div class="d-flex flex-column">
                <label for="">Gender:</label>
                <div>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    v-model="dataUser.gender"
                  />
                  Male
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    v-model="dataUser.gender"
                  />
                  Female
                  <input
                    type="radio"
                    name="gender"
                    value="Other"
                    v-model="dataUser.gender"
                  />
                  Other
                </div>
              </div>

              <label for="">DayOfBirth:</label>
              <input type="date" v-model="dataUser.dayOfBirth" />
              <p v-if="errorDayOfBirth" class="text-danger">
                Ngày sinh không hợp lệ (không lớn hơn ngày hiện tại)
              </p>

              <label for="">Email:</label>
              <input type="text" v-model="dataUser.email" />
              <p v-if="errorEmail" class="text-danger">
                Email không hợp lệ (không được trùng)
              </p>

              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button type="submit" class="btn btn-primary">Save</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import validator from "validator";

// const users = [
//   {
//     id: 1,
//     name: "John Doe",
//     gender: "Male",
//     dateOfBirth: "1990-01-01",
//     email: "john.doe@example.com",
//   },
//   {
//     id: 2,
//     name: "Jane Smith",
//     gender: "Female",
//     dateOfBirth: "1992-03-15",
//     email: "jane.smith@example.com",
//   },
//   {
//     id: 3,
//     name: "Mike Johnson",
//     gender: "Male",
//     dateOfBirth: "1988-06-21",
//     email: "mike.johnson@example.com",
//   },
//   {
//     id: 4,
//     name: "Emily Davis",
//     gender: "Female",
//     dateOfBirth: "1995-07-12",
//     email: "emily.davis@example.com",
//   }
// ];

// localStorage.setItem("users", JSON.stringify(users));

const users = ref(JSON.parse(localStorage.getItem("users")) || []);

const dataUser = ref({
  id: users.value.length + 1,
  name: "",
  email: "",
  dayOfBirth: "",
  gender: "",
});

const errorName = ref(false);
const errorDayOfBirth = ref(false);
const errorEmail = ref(false);
const isEdit = ref(false);
const search = ref("");

const filteredUsers = computed(() => {
  return users.value.filter((user) => user.email.includes(search.value));
});

const resetForm = () => {
  dataUser.value = {
    id: users.value.length + 1,
    name: "",
    email: "",
    dayOfBirth: "",
    gender: "",
  };
  isEdit.value = false;
};

// Lấy thông tin user cần sửa
const handleEditUser = (id) => {
  const userEdit = users.value.find((user) => user.id == id);
  if (userEdit) {
    dataUser.value = { ...userEdit };
    isEdit.value = true;
  }
};

// Hàm thêm hoặc cập nhật user
const handleCreateOrUpdate = () => {
  errorName.value = !dataUser.value.name;
  errorDayOfBirth.value = !dataUser.value.dayOfBirth;

  // kiểm tra xem có trùng email không
  const isDuplicateEmail = users.value.some(
    (user) =>
      user.email === dataUser.value.email && user.id !== dataUser.value.id
  );
  errorEmail.value =
    !dataUser.value.email ||
    !validator.isEmail(dataUser.value.email) ||
    isDuplicateEmail;

  // kiểm tra xem ngày sinh không được lớn hơn ngày hiện tại
  const currentDate = new Date();
  const inputDate = new Date(dataUser.value.dayOfBirth);
  errorDayOfBirth.value = inputDate > currentDate;

  if (errorName.value || errorDayOfBirth.value || errorEmail.value) {
    return;
  }

  if (isEdit.value) {
    // Cập nhật thông tin user
    const index = users.value.findIndex((user) => user.id == dataUser.value.id);
    if (index !== -1) {
      users.value[index] = { ...dataUser.value };
    }
  } else {
    // Thêm mới user
    users.value.push({ ...dataUser.value });
  }

  localStorage.setItem("users", JSON.stringify(users.value));
  resetForm();

  const modal = document.getElementById("exampleModal");
  const modalInstance = bootstrap.Modal.getInstance(modal);
  modalInstance.hide();
};

// Hàm xóa user
const handleDelete = (id) => {
  const confirmed = window.confirm(
    "Bạn có chắc chắn muốn xóa người dùng này không?"
  );
  if (confirmed) {
    users.value = users.value.filter((user) => user.id != id);
    localStorage.setItem("users", JSON.stringify(users.value));
  }
};
</script>

<style></style>
