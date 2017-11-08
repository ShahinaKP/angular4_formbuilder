import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DragDropDirectiveModule} from "angular4-drag-drop";


import { config, defaultI18n, defaultOptions } from "./lib/formbuilder/config";
import { FormBuilderCreateor } from "./lib/formbuilder/form-builder";
import I18N from "./lib/formbuilder/mi18n";


function initJq() {
  (function ($) {
    (<any>$.fn).formBuilder = function (options) {
      if (!options) {
        options = {};
      }
      let elems = this;
      let {i18n, ...opts} = $.extend({}, defaultOptions, options, true);
      (<any>config).opts = opts;
      let i18nOpts = $.extend({}, defaultI18n, i18n, true);
      let instance = {
        actions: {
          getData: null,
          setData: null,
          save: null,
          showData: null,
          setLang: null,
          addField: null,
          removeField: null,
          clearFields: null
        },
        get formData() {
          return instance.actions.getData('json');
        },

        promise: new Promise(function (resolve, reject) {
          new I18N().init(i18nOpts).then(() => {
            elems.each(i => {
              let formBuilder = new FormBuilderCreateor().getFormBuilder(opts, elems[i]);
              $(elems[i]).data('formBuilder', formBuilder);
              instance.actions = formBuilder.actions;
            });
            delete instance.promise;
            resolve(instance);
          }).catch(console.error);
        })

      };

      return instance;
    };
  })(jQuery); 
}

@Component({
  selector: 'form-builder',
  templateUrl: './formbuilder.component.html',
  styleUrls: ['./formbuilder.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class FormBuilderComponent implements OnInit {
  constructor() {
  }

  formBuilder: any;
  ngOnInit(): void {
    initJq();
    this.formBuilder = (<any>jQuery('.build-wrap')).formBuilder();
    console.log(this.formBuilder);
  }

  
}




