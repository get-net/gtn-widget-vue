# ncform-bootstrap

ncform-bootstrap widget for [ncform](https://github.com/ncform/ncform)

## Installation

```
npm i -s ncform-bootstrap
```

**Add the widget**

```
import ncformBootstrap from 'ncform-bootstrap';

Vue.use(vueNcform, { extComponents: ncformBootstrap });

// specify language Vue.use(vueNcform, { extComponents: ncformBootstrap, lang: 'en'});

// or vm.$ncformAddWidget({name: 'ncformBootstrap', widget: ncformBootstrap});

```

## Widget components

For now widget contains 7 bootstrap components

* input
* select
* upload
* textarea
* radio
* datepicker
* checkbox

**input**
```
  defaultConfig: {
    appendIcon: null,
    prependIcon: null,
    trim: false,
    size: "md",
    pattern: null,
    state: null
  }
```
**select**
```
  defaultConfig: {
    options: "",
    mutiple: "",
    select_size: 1,
    size: "md",
    state: null
  }
```

**upload**
```
  defaultConfig: {
    drop_placeholder: "drop file here",
    multiple: false,
    size: "md",
    state: null,
    accept: "*"
  }
```

**textarea**
```
   defaultConfig: {
    clearable: true,
    pattern: "",
    rows: 4,
    max_rows: null,
    size: "md",
    no_resize: false,
    state: null
  }
```

**radio**
```
  defaultConfig: {
    size: "md",
    options: null,
    name: "radios",
    stacked: false
  }
```

**datepicker**
```
  defaultConfig: {
    size: "md",
    locale: "en",
    min: null,
    max: null,
    state: null,
    date_format_options: null,
    format: "YYYY-MM-DD",
    allowInput: false
  }
```

**checkbox**
```
  defaultConfig: {
    size: "md",
    name: "",
    stacked: false
  }
```

## Usage

quick example of using widget
form schema for ncform below
```
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
              }
            },
            rules: {
              required: {
                value: true, // The value passed to the validation rule
                errMsg: "yep it is required!" // Error message
              }
            },
          },
          date: {
            type: "date",
            ui: {
              columns: 3,
              label: "datepicker",
              placeholder: "date",
              widget: "datepicker",
              widgetConfig: {
                showState: true,
                min: new Date(),
                format: "DD.MM.YYYY",
                allowInput: true,
              }
            },
            rules: {
              required: {
                value: true,
                errMsg: "yep it is required!" 
              }
            },
            value: new Date().toISOString()
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
              widgetConfig: {}
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
                label: "checkbox",
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
                enumSource: [
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
        value: {},
      }
```