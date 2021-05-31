<template>
  <el-skeleton class="brick-item brick-item-m brick-item-m-2" :loading="!p?.id" animated>
    <template #template>
      <a>
        <div class="figure figure-img">
          <el-skeleton-item
            variant="image"
            style="height: 100%"
          />
        </div>
        <h3 class="title">
          <el-skeleton-item variant="text" style="width: 100%" />
        </h3>
        <p class="desc">
          <el-skeleton-item variant="text" style="width: 100%" />
        </p>
        <p class="price">
          <el-skeleton-item variant="text" style="width: 30%" />
        </p>
      </a>
    </template>
    <template #default>
      <li class="brick-item brick-item-m brick-item-m-2">
        <router-link :to="{name: 'product', query: {productId: p.id}}" target="_blank">
          <div class="figure figure-img">
            <img width="160" height="160" :alt="p.name" :src="(p.imageHost ?? VITE_OSS_URL) + p.mainImage ">
          </div>
          <h3 class="title">{{ p.name }}</h3>
          <p class="desc">{{ p.subtitle }}</p>
          <p class="price"><span class="num">{{ p.price }}</span>&nbsp;元</p>
        </router-link>
      </li>
    </template>
  </el-skeleton>
</template>

<script setup>
import { computed, defineProps } from 'vue'

const props = defineProps(['data'])
const p = computed(() => props.data)
</script>
