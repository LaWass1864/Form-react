import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

const FormTemplate = () => {
  //  il va recuperer ce qui a été mit dans l'input, le textearea
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    const formMess = document.querySelector(".form-message")


    emailjs.sendForm(
      "service_57t1xy2",
      "template_rspn9qe",
      form.current,
      process.env.REACT_APP_ID
    )
      // cacher l'User Id, on va faire une variable d'environnement (connu par nous seulement)
      .then((result) => {
        //  Si ca se passe bien on mets OK et pour le remettre a zero
        console.log(result.text);
        form.current.reset();
        formMess.innerHTML = "<p class='success'> Message envoyé ! </p>";
        //  Le message disparait au bout de 2 secondes et 5 millieme
        setTimeout(() => {
          formMess.innerHTML = "";
        }, 2500)
      }, (error) => {
        console.log(error.text);
        formMess.innerHTML = "<p class='error'> Une erreur s'est produite, veuillez réessayer </p>";

        setTimeout(() => {
          formMess.innerHTML = "";
        }, 2500)
      });
  };

  return (
    <div className="form-container">
      <form ref={form} onSubmit={sendEmail}>
        <label>Name</label>
        <input type="text" name="name" required autoComplete='off' />
        <label>Email</label>
        <input type="email" name="email" required autoComplete='off' />
        <label>Message</label>
        <textarea name="message" required />
        <input type="submit" value="Envoyer" />
      </form>
      {/* ajouter un message si c'est reussi ou non  */}
      <div className="form-message"></div>
    </div>
  );
};

export default FormTemplate;