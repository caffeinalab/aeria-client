import {
  Input,
  TextArea,
  Checkbox,
  Wysiwyg,
  Select,
  Picture,
  Gallery,
  Switch,
  DatePicker,
  DateRangePicker,
} from '@aeria/uikit'

import {
  Maps,
  Fieldset,
  Repeater,
  Sections
} from '@aeria/core'

export default {
  uikit: {
    'text': Input,
    'number': Input,
    'url': Input,
    'email': Input,
    'hidden': Input,
    'textarea': TextArea,
    'checkbox': Checkbox,
    'wysiwyg': Wysiwyg,
    'select': Select,
    'picture': Picture,
    'gallery': Gallery,
    'repeater': Repeater,
    'sections': Sections,
    'switch': Switch,
    'fieldset': Fieldset,
    'date': DatePicker,
    'daterange': DateRangePicker,
    // 'maps': Maps
  }
}
