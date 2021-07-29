import {
  Form as VeeForm, Field as VeeField, defineRule, ErrorMessage, configure,
} from 'vee-validate';
import {
  required, min_value as minVal, max_value as maxVal,
} from '@vee-validate/rules';

export default {
  install(app) {
    app.component('VeeForm', VeeForm);
    app.component('VeeField', VeeField);
    app.component('ErrorMessage', ErrorMessage);

    // defineRule用來定義規則, 第一個參數是名稱，取甚麼都可以，不一定要和rules定義的一樣。第二個是定義規則內容，這邊引入rules的
    defineRule('required', required);
    defineRule('min_value', minVal);
    defineRule('max_value', maxVal);

    configure({
      // 當global validator function return false, generateMessage將被呼叫
      generateMessage: (ctx) => {
        // ctx parameter is an object information about the field being validated
        const messages = {
          required: `The field ${ctx.field} is required.`,
          min_value: `The field ${ctx.field} is too low.`,
          max_value: `The field ${ctx.field} is too high.`,
        };

        const message = messages[ctx.rule.name] ? messages[ctx.rule.name] : `The field ${ctx.field} is invalid.`;
        return message;
      },
      // 驗證時機有關的設定
      validateOnBlur: true, // 預設true, 移開輸入框時做驗證
      validateOnChange: true, // 預設true, 輸入完成且有改值才做驗證
      validateOnInput: false, // 預設false, 每次鍵入都會做驗證(立即地)
      validateOnModelUpdate: true, // 預設true, 綁定的v-model更改時驗證
    });
  },
};
