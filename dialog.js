const createDialog = (config) => {
   const createElementWithClass = (tagName, className) => {
     const element = document.createElement(tagName);
     element.className = className;
     return element;
   };

   const dialog = createElementWithClass('div', config.dialogClass || 'dialog blur');
   dialog.setAttribute('id', config.id);

   const content = createElementWithClass('div', config.contentClass || 'dialog_content');
   content.style = config.dialogContentStyle;

   const title = createElementWithClass('div', config.titleClass || 'dialog_title');
   title.innerHTML = `<div class="title-content">${config.title}</div>`;

   const closeBtn = createElementWithClass('div', config.closeDialog || 'dialog_btn_close');
   closeBtn.addEventListener('click', config.closeBtn || (() => closeDialog(dialog)));
   title.appendChild(closeBtn);

   const body = createElementWithClass('div', config.bodyClass || 'dialog_body');
   body.innerHTML = config.body;

   const info = config.info ? createElementWithClass('div', config.infoClass || 'dialog_info') : null;
   if (info) info.innerHTML = config.info;

   const footer = config.footer ? createElementWithClass('div', config.footerClass || 'dialog_footer') : null;
   if (footer) {
     const footerLeft = createElementWithClass('div', 'left-footer');
     const footerRight = createElementWithClass('div', 'right-footer');

     config.footer.forEach((f) => {
       f.html?.forEach((htmlConfig) => {
         const div = createElementWithClass('div', htmlConfig.style);
         div.innerHTML = htmlConfig.html;
         (htmlConfig.position === 'left' ? footerLeft : footerRight).appendChild(div);
       });

       f.buttons?.forEach((buttonConfig) => {
         const button = createElementWithClass('button', buttonConfig.style);
         button.textContent = buttonConfig.text;
         button.addEventListener('click', buttonConfig.callback);
         (buttonConfig.position === 'left' ? footerLeft : footerRight).appendChild(button);
       });
     });

     footer.appendChild(footerLeft);
     footer.appendChild(footerRight);
   }

   [title, body, info, footer].forEach((section) => {
     if (section) content.appendChild(section);
   });

   dialog.appendChild(content);
   document.body.appendChild(dialog);
   return dialog;
 };

 const closeDialog = (dialog) => {
   dialog?.parentNode?.removeChild(dialog);
 };
