<template>
  <div class="col-12">
    <div class="card">
      <h5>Thông tin khách hàng</h5>
      <div class="p-fluid formgrid grid">
        <div class="field col-12 md:col-3">
          <label for="taxCode">Mã số thuế</label>
          <InputText id="taxCode" 
                     v-model="newCustomer.taxCode" 
                     type="text" 
                     @blur="loadAddress(newCustomer.taxCode)" 
                     @change="checkTaxCode"
                     :required="true"
                     v-numbers-only
          />
        </div>
        <div class="field col-12 md:col-6">
          <label for="fullName">Tên doanh nghiệp</label>
          <InputText id="fullName" v-model="newCustomer.fullName" type="text" />
        </div>
        <div class="field col-12 md:col-3">
          <label for="shortName">Tên viết tắt</label>
          <InputText id="shortName" v-model="newCustomer.shortName" type="text" />
        </div>
        <div class="field col-6">
          <label for="address">Địa chỉ trụ sở</label>
          <Textarea id="address" v-model="newCustomer.address" rows="3" />
        </div>
        <div class="field col-6">
          <label for="address">Địa chỉ nhận thông báo</label>
          <Textarea id="address" v-model="newCustomer.address" rows="3" />
        </div>
        <div class="field col-12 md:col-3">
          <label for="rep">Người đại diện</label>
          <InputText id="rep" v-model="newCustomer.representative" type="text" />
        </div>
        <div class="field col-12 md:col-3">
          <label for="contact">Người liên hệ</label>
          <InputText id="contact" v-model="newCustomer.contactPerson" type="text" />
        </div>
        <div class="field col-12 md:col-3">
          <label for="phone">Điện thoại</label>
          <InputText id="phone" v-model="newCustomer.phone" type="text" />
        </div>
        <div class="field col-12 md:col-3">
          <label for="email">Email</label>
          <InputText id="email" v-model="newCustomer.email" type="text" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="city">Tỉnh/Thành phố</label>
          <Dropdown id="city"
                    :options="provinceList"
                    filter optionLabel="name"
                    v-model="selectProvince"
                    type="text"
                    show-clear
                    placeholder="Chọn tỉnh/thành phố"
                    @change="onChangeProvince"
          />
        </div>
        <div class="field col-12 md:col-4">
          <label for="state">Quận/Huyện</label>
          <Dropdown id="state" filter
                    :options="districtList"
                    optionLabel="name"
                    v-model="selectDistrict"
                    show-clear
                    :disabled="districtListDisable"
                    placeholder="Chọn quận/huyện"
                    @change="onChangeDistrict"
          />
        </div>
        <div class="field col-12 md:col-4">
          <label for="taxAuth">Cơ quan thuế</label>
          <Dropdown id="taxAuth"
                    :options="taxAuthList"
                    v-model="selectTaxAuth"
                    optionLabel="name"
                    filter
                    :disabled="taxAuthListDisable"
                    type="text"
                    placeholder="Chọn cơ quan thuế"
                    @change="onSelectTaxAuth"
          />
        </div>
        <div class="field col-12 md:col-4">
          <label for="taxAcc">Tài khoản iHTKK</label>
          <InputText id="taxAcc" v-model="newCustomer.taxAccount" @focus="onFocusTaxAccount" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="taxPass">Mật khẩu iHTKK</label>
          <Password :feedback="false" toggle-mask id="taxPass" v-model="newCustomer.taxAccountPassword" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="pin">PIN chữ ký số</label>
          <Password :feedback="false" toggle-mask id="pin" v-model="newCustomer.eSignerPinCode" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="inv">Nhà cung cấp hóa đơn</label>
          <InputText id="inv" v-model="newCustomer.invoiceProvider" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="invAcc">Tài khoản hóa đơn</label>
          <InputText id="invAcc" v-model="newCustomer.invoiceAccount" />
        </div>
        <div class="field col-12 md:col-4">
          <label for="invPass">Mật khẩu hóa đơn</label>
          <Password :feedback="false" toggle-mask id="invPass" v-model="newCustomer.invoicePassword" />
        </div>
      </div>
      <div class="col-12 md:col-4">
        <span class="p-buttonset">
          <Button icon="pi pi-check" class="p-button-primary" label="Submit" @click="onSubmit" :disabled="!isValid"/>
          <Button icon="pi pi-times" class="p-button-danger" label = "Cancel" @click="router.push('/customer/all')"/>
          <Button icon="pi pi-trash" class="p-button-warning" label="Reset" @click="reset"/>
        </span>
      </div>
      <div class="col-12 md:col-4">
        <h6>Keep adding</h6>
        <InputSwitch id="contAdd" v-model="continueAdd"/>
      </div>
    </div>
    <div class="card flex justify-content-center">
      <Toast/>
    </div>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref } from "vue";
import router from "@/router";
import CustomerService from "@/service/CustomerService";
import AdministrativeService from "@/service/AdministrativeService";
import { FilterMatchMode } from "primevue/api";
import { useToast } from "primevue/usetoast";
import numberOnly from "@/customDirectives/numberOnly";

const toast = useToast();

const customerService = new CustomerService();
const adminService = new AdministrativeService();
const customerList = ref([]);
const newCustomer = ref({
  fullName: null,
  shortName: null,
  taxCode: null,
  address: null,
  email: null,
  phone: null,
  districtId: null,
  provinceId: null,
  taxAuthorityId: null,
  representative: null,
  contactPerson: null,
  taxAccount: null,
  taxAccountPassword: null,
  invoiceProvider: null,
  invoiceAccount: null,
  invoicePassword: null,
  eSignerPinCode: null

});
const provinceList = ref([]);
const selectProvince = ref();
const districtList = ref([]);
const districtListDisable = ref(true);
const selectDistrict = ref();
const taxAuthList = ref([]);
const selectTaxAuth = ref();
const taxAuthListDisable = ref(true);
const filters = ref({});

const isValid = ref(false);
const continueAdd = ref(false);

onBeforeMount(() => {
  initFilters();
});

onMounted(async () => {
  await adminService.getAllProvinces().then((res) => {
    provinceList.value = res.data;
  });
});

const initFilters = () => {
  filters.value = {
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  };
};

const onChangeProvince = () => {
  if (selectProvince.value !== null) {
    adminService.getDistricts(selectProvince.value.id).then(res => {
      if (res.data) {
        districtListDisable.value = false;
        districtList.value = res.data;
        newCustomer.value.provinceId = selectProvince.value.id;
      }

    });

    adminService.getTaxAuthByProvince(selectProvince.value.id).then(res => {
      console.log(res);
      if (res.data) {
        taxAuthList.value = res.data;
        taxAuthListDisable.value = false;
      }
    });
  } else {
    districtList.value = null;
    selectDistrict.value = null;
    districtListDisable.value = true;
    taxAuthList.value = null;
    selectTaxAuth.value = null;
    taxAuthListDisable.value = true;
    newCustomer.value.districtId = null;
    newCustomer.value.taxAuthorityId = null;
  }
};

const onSelectTaxAuth = () => {
  if (selectTaxAuth !== null) {
    newCustomer.value.taxAuthorityId = selectTaxAuth.value.id;
  } else {
    newCustomer.value.taxAuthorityId = null;
  }
  console.log({ ...newCustomer.value });
};

const onChangeDistrict = () => {
  if (selectDistrict.value !== null) {
    newCustomer.value.districtId = selectDistrict.value.id;
  } else {
    newCustomer.value.districtId = null;
  }

};

const onFocusTaxAccount = () => {
  if (newCustomer.value.taxCode !== null) {
    newCustomer.value.taxAccount = newCustomer.value.taxCode + "-QL";
  }
};

const loadAddress = (taxCode) => {
  customerService.getCustomerInfo(taxCode).then(res => {
    if (res.code === "00") {
      newCustomer.value.fullName = res.data.name;
      newCustomer.value.address = res.data.address;
    }
  })
    .catch(err => {
      toast.add({
        severity: 'error',
        summary: 'Cảnh báo',
        detail: 'Mã số thuế không được để trống',
        life: 2000
      })
    });
};

const checkTaxCode = () => {
  adminService.checkTaxCode(newCustomer.value.taxCode)
    .then(res => {
      if(res.succeed === false) {
        toast.add({
          severity: 'error',
          summary: 'Cảnh báo',
          detail: 'Mã số thuế đã tồn tại trong hệ thống',
          life: 5000
        });
        isValid.value = false;
      }
      else {
        isValid.value = true;
      }
    })
}

const onSubmit = () => {
  customerService.createCustomer({ ...newCustomer.value })
    .then(res => {
        toast.add({
          severity: 'success',
          summary: 'Thành công',
          detail: `Đã thêm mới khách hàng ${newCustomer.value.taxCode}`,
          life: 5000
        });
      reset();
    });
  
};

const reset = () => {
  Object.keys(newCustomer.value).forEach(index => newCustomer.value[index] = null);
  selectDistrict.value = null;
  selectProvince.value = null;
  selectTaxAuth.value = null;
  districtListDisable.value = true;
  toast.add({
    severity: 'info',
    summary: 'Thông báo',
    detail: 'Form đã được xóa',
    life: 5000,
    //group: 'br'
  });
};
</script>

<style scoped></style>
