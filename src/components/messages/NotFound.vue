<template>
  <div>
    <div class="notification-content">
      <div>
        <img
          alt="not found image"
          src="/img/not-found.svg"
          class="not-found-image"
        />
        <h1 class="mt-3 font-weight-bold error-title">
          404. Контент не завезли.
        </h1>
        <p class="text-center go-back">
          Вернитесь обратно и подождите.
          <router-link :to="{ name: 'layout' }" class="go-back-btn"
            >Вернуться</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
name: "NotFound"
}
</script>

<style scoped></style>