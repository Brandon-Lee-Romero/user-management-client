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
      <PencilIcon /> 
      <DeleteIcon />
    </td>
  </tr>
</template>


<script setup>
import DeleteIcon from '../icons/DeleteIcon.vue';
import PencilIcon from '../icons/PencilIcon.vue';


defineProps({
    user: Object
})

</script>