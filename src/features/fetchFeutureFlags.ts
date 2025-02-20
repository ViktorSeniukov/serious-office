import { ref, watch } from 'vue';

export const fetchFeutureFlags = () => {
  const flags = ref<[] | null>(null);

  fetch('https://edge.api.flagsmith.com/api/v1/flags', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'X-Environment-Key': import.meta.env['VITE_FLAGSMITH_API_KEY']
    }
  }).then((res) => res.json())
    .then((res) => flags.value = res);

  watch(flags, () => {
    console.log(flags.value);
  }, {
    immediate: true
  });



  return flags;
};
