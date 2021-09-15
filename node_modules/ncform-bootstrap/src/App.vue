<template>
  <div>
    <ncform
      :form-schema="formSchema"
      form-name="your-form-name"
      v-model="formSchema.value"
      @submit="submit()"
    ></ncform>
    <hr />
    <b-button @click="submit()">Submit</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formSchema: {
        type: "object",
        properties: {
          demo: {
            type: "string",
            ui: {
              columns: 12,
              label: "test-input",
              placeholder: "your paceholder",
              itemClass: "ml-3",
              readonly: false,
              widgetConfig: {
                size: "md",
                appendIcon: "arrow-up",
                prependIcon: null,
                showState: true, // flag indicates whether to show validation state in componentб
              }
            },
            rules: {
              required: {
                value: true, // The value passed to the validation rule
                errMsg: "yep it is required!", // Error message
                options: {
                  // Rule options
                  delay: 300, // Delayed verification time (ms)
                  delayMsg: "Checking..." // Prompt for delayed verification
                }
              },
              pattern: {
                value: ".{5,}",
                errMsg: "minimum 5"
              },
              email: {
                value: true,
                errMsg: "email required"
              }
            },
            value: ""
          },
          age: {
            type: "number", //may be integer
            ui: {
              columns: 3,
              label: "numeric input",
              placeholder: "Last name",
              widgetConfig: {
                showState: true
              }
            },
            rules: {
              maximum: {
                value: 60,
                errMsg: "too much"
              },
              minimum: {
                value: 3,
                errMsg: "too smll"
              }
            },
            value: 21
          },
          file: {
            type: "array",
            ui: {
              columns: 3,
              label: "file-upload",
              placeholder: "file",
              widget: "upload",
              widgetConfig: {
                multiple: true,
                showState: true,
                preview: true
              }
            },
            rules: {
              required: {
                value: true, // The value passed to the validation rule
                errMsg: "yep it is required!" // Error message
              }
            },
            value: ""
          },
          date: {
            type: "date",
            ui: {
              columns: 3,
              label: "datepicker",
              placeholder: "dd.mm.yyyy",
              widget: "datepicker",
              widgetConfig: {
                locale: "ru",
                showState: true,
                format: "DD.MM.YYYY",
                min: new Date(),
                allowInput: true,
              }
            },
            rules: {
              required: {
                value: true,
                errMsg: "yep it is required!"
              }
            },
            value: "2021-03-23T19:00:00.000Z"
          },
          select: {
            type: "string",
            ui: {
              columns: 3,
              itemClass: "",
              label: "select",
              placeholder: "date",
              widget: "select",
              widgetConfig: {
                multiple: false,
                options: [
                  { value: "a", text: "This is First option" },
                  { value: "b", text: "Default Selected Option" },
                  { value: "c", text: "This is another option" },
                  { value: "d", text: "This one is disabled", disabled: true },
                  { value: "e", text: "This is option e" }
                ],
                select_size: 1
              }
            },
            value: "b"
          },
          textarea: {
            type: "string",
            ui: {
              columns: 3,
              label: "textarea",
              placeholder: "your text here",
              widget: "textarea",
              widgetConfig: {
                showState: true
              }
            }
          },
          bool: {
            type: "boolean",
            value: true,
            ui: {
              columns: 3
            }
          },
          manyradio: {
            type: "number",
            ui: {
              columns: 3,
              widget: "radio",
              widgetConfig: {
                name: "manyrad",
                stacked: true,
                options: [
                  {
                    value: 1,
                    text: "orange"
                  },
                  {
                    value: 2,
                    text: "red"
                  },
                  {
                    value: 3,
                    text: "blue"
                  }
                ]
              }
            }
          },
          checkbox: {
            type: "array",
            ui: {
              itemClass: "",
              columns: 3
            },
            items: {
              type: "boolean",
              ui: {
                label: "Чекбокс",
                columns: 3
              }
            }
          },
          manychecbox: {
            type: "number",
            ui: {
              columns: 3,
              itemClass: "",
              widget: "checkbox",
              widgetConfig: {
                name: "manycheck",
                options: [
                  {
                    value: 1,
                    text: "orange"
                  },
                  {
                    value: 2,
                    text: "red"
                  },
                  {
                    value: 3,
                    text: "blue"
                  }
                ]
              }
            }
          },
          btn: {
            ui: {
              columns: 3,
              widget: "button",
              widgetConfig: {
                btnClickAction: "dx: () => console.log('btn action')"
              }
            }
          }
        },
        value: {}
      },
      formSchema2: {
        type: "object",
        properties: [
          {
            type: "number", //may be integer
            ui: {
              columns: 3,
              label: "numeric input",
              placeholder: "Last name",
              widgetConfig: {
                type: "number",
                showState: true
              }
            },
            rules: {
              maximum: {
                value: 60,
                errMsg: "too much"
              },
              minimum: {
                value: 3,
                errMsg: "too smll"
              }
            },
            value: 21
          },
        ],
        
        value: {0: "123"}
      }
    };
  },
  methods: {
    submit() {
      this.$ncformValidate("your-form-name").then(data => {
        if (data.result) {
          console.log(this.$data.formSchema.value);
        }
      });
    }
  }
};
</script>
