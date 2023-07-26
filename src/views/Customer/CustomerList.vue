<template>
  <div class="grid">
    <div class="col-12">
      <div class="card">
        <Button label="New" icon="pi pi-plus" class="p-button-success mr-2" @click="router.push('/customer')"/>
      </div>
    </div>
    <div class="col-12">
      <div class="card">
        <DataTable
          :value="customerList"
          showGridlines striped-rows
          paginator :rows="10" :rowsPerPageOptions="[5, 10, 20, 50, 100]"
          paginatorTemplate="RowsPerPageDropdown FirstPageLink PageLinks PrevPageLink CurrentPageReport NextPageLink LastPageLink"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
          removable-sort
          v-model:filters="filters"
        >
          <template #header>
            <div class="flex flex-wrap align-items-center justify-content-between gap-2">
              <h5>Danh sách khách hàng</h5>
              <InputText v-model="filters['global'].value" placeholder="Tên, MST..." />
            </div>
          </template>
          <Column field="fullName" header="Tên doanh nghiệp" />
          <Column field="taxCode" header="Mã số thuế" :sortable="true" />
          <Column field="address" header="Địa chỉ trụ sở" />
          <Column field="taxAuthority" header="Cơ quan quản lý thuế" :sortable="true" />
          <Column field="phone" header="Điện thoại" />
          <Column field="email" header="Email" />
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script setup>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import ColumnGroup from "primevue/columngroup";
import Row from "primevue/row";
import { onBeforeMount, onMounted, ref } from "vue";
import CustomerService from "@/service/CustomerService";
import { FilterMatchMode } from "primevue/api";
import router from "@/router";

const customerService = new CustomerService();
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});
const customerList = ref([]);
const selectCustomer = ref(null);

onBeforeMount(() => {
  customerService.getAllCustomer(1, 200)
    .then(res => {
      customerList.value = res.data;
    });
});
</script>

<style scoped>

</style>