{
  const getCountryList = async name => {
    return new Promise(resolve => {
      const xhr = new XMLHttpRequest()
      xhr.open('GET', `https://restcountries.eu/rest/v2/name/${name}`)
      xhr.send()
      xhr.onloadend = () => {
        try {
          resolve(JSON.parse(xhr.response).map(info => info.name))
        } catch (error) {
          resolve([])
        }
      }
    })
  }
  const { ref, createApp } = Vue

  const app = createApp({
    name: 'app',
    setup() {
      const options = ref([])
      const visibleOptions = ref([])
      const model = ref([])

      const loadingCount = ref(0)
      const searchInput = ref('')
      const handleSearchInput = async event => {
        searchInput.value = event.target.value
        if (searchInput.value === '') {
          visibleOptions.value = model.value
          return
        }

        ++loadingCount.value
        const currentSearchInput = searchInput.value
        const foundOptions = await getCountryList(searchInput.value)
        if (currentSearchInput === searchInput.value) {
          options.value = model.value.concat(foundOptions)
          options.value = Array.from(new Set(options.value))
          visibleOptions.value = foundOptions
        }
        --loadingCount.value
      }

      return {
        model,
        options,
        visibleOptions,
        loadingCount,
        handleSearchInput,
      }
    },
    template: `
      <vue-select
        v-model="model"
        :options="options"
        :visible-options="visibleOptions"
        multiple
        taggable
        searchable
        :min="3"
        @search-input="handleSearchInput"
        :loading="loadingCount !== 0"
      ></vue-select>
      <pre>{{ model }}</pre>
    `,
  })

  app.component('vue-select', VueNextSelect)
  app.mount(document.querySelector('#asynchronous-select'))
}
