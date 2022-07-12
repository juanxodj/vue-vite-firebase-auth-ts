<template>
  <form>
    <label>{{ t('menu.language') }}</label>
    <select v-model="locale">
      <option value="es">Español</option>
      <option value="en">Inglés</option>
    </select>
  </form>
  <a-row>
    <a-col :xs="{ span: 24 }" :sm="{ span: 18, offset: 3 }" :lg="{ span: 12, offset: 6 }">
      <a-form :model="formState" @finish="onFinish" @finishFailed="onFinishFailed" name="basic" layout="vertical"
        autocomplete="off">
        <a-form-item :label="t('login.email')" name="email" :rules="[
          {
            required: true,
            type: 'email',
            message: t('validations.email'),
          },
        ]">
          <a-input v-model:value="formState.email"></a-input>
        </a-form-item>
        <a-form-item :label="t('login.password')" name="password" :rules="[
          {
            required: true,
            min: 6,
            message: t('validations.password'),
          },
        ]">
          <a-input-password v-model:value="formState.password"></a-input-password>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit">{{ t('login.enter') }}</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useUserStore } from "@/store/user";
import { message } from "ant-design-vue";
import { Login } from "@/models/login.model";
import "ant-design-vue/es/message/style/css";

const { locale, t } = useI18n();
const userStore = useUserStore();

const formState: Login = reactive({
  email: "jlsc92@gmail.com",
  password: "123456",
});

const onFinish = async () => {
  const res = await userStore.loginUser(formState.email, formState.password);
  if (res === "auth/wrong-password") {
    message.error("credenciales no válidas");
  }
};

const onFinishFailed = (errorInfo: any) => {
  console.log("Failed:", errorInfo);
};
</script>
