function createElementByTemplate(template, data) {
   const args = ['value'];
   if (typeof data === 'object' && data !== null) {
      args.push(...Object.keys(data));
   }

   const argValues = [data]
   if (typeof data === 'object' && data !== null) {
      argValues.push(...Object.keys(data).map(arg => data[arg]));
   }

   const element = template.content ? template.content.cloneNode(true) : template.cloneNode(true);

   let field;

   field = element.querySelector('[data-if]');
   while (field) {
      const value = (new Function(...args, `return ${field.getAttribute('data-if')};`))(...argValues);
      if (value) {
         while (field.firstChild) {
            field.parentNode.insertBefore(field.firstChild, field);
         }
      }
      field.parentNode.removeChild(field);
      field = element.querySelector('[data-if]');
   }

   field = element.querySelector('[data-loop]');
   while (field) {
      const value = (new Function(...args, `return ${field.getAttribute('data-loop')};`))(...argValues);
      field.removeAttribute('data-loop');
      value.forEach(item => {
         field.parentNode.insertBefore(createElementByTemplate(field, item), field);
      });

      field.parentNode.removeChild(field);
      field = element.querySelector('[data-loop]');
   }

   field = element.querySelector('[data-field]');
   while (field) {
      const value = (new Function(...args, `return ${field.getAttribute('data-field')};`))(...argValues);
      field.parentNode.insertBefore(document.createTextNode(value), field);
      field.parentNode.removeChild(field);
      field = element.querySelector('[data-field]');
   }

   return element;
}
