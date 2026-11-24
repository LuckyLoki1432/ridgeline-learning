import { useEffect, useRef, useState } from 'react';
import { programs } from './Programs.jsx';
import styles from '../App.module.css';

const initial = { name: '', email: '', program: '', consent: false };

function validate(values) {
  const errors = {};
  const name = values.name.trim();
  if (name.length < 2 || name.length > 80) errors.name = 'Enter a name between 2 and 80 characters.';
  if (!/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(values.email.trim())) errors.email = 'Enter a valid email address.';
  if (!programs.some((program) => program.name === values.program)) errors.program = 'Choose one of the listed programs.';
  if (!values.consent) errors.consent = 'Please agree to be contacted.';
  return errors;
}

export default function RegistrationForm() {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [focusField, setFocusField] = useState('');
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const programRef = useRef(null);
  const consentRef = useRef(null);

  useEffect(() => {
    const refs = { name: nameRef, email: emailRef, program: programRef, consent: consentRef };
    if (focusField && refs[focusField]?.current) {
      refs[focusField].current.focus();
      setFocusField('');
    }
  }, [focusField]);

  const update = (field, value) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: '' }));
    setSubmitted(false);
  };

  const submit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    const firstInvalid = ['name', 'email', 'program', 'consent'].find((field) => nextErrors[field]);
    if (firstInvalid) {
      setFocusField(firstInvalid);
      setSubmitted(false);
      return;
    }
    setSubmitted(true);
    setValues(initial);
    setErrors({});
  };

  return (
    <section id="register" className={styles.registration} aria-labelledby="register-title">
      <div className={styles.registrationCopy}>
        <h2 id="register-title">Start with a conversation</h2>
        <p>Tell us what you want to learn. We will display a confirmation on this page after your form passes validation.</p>
        <p className={styles.privacyHint}>Your details stay in this page preview. Nothing is sent or stored.</p>
      </div>
      <form className={styles.form} onSubmit={submit} noValidate>
        {Object.keys(errors).length > 0 && (
          <div className={styles.errorSummary} role="alert" aria-live="assertive">
            Please correct the highlighted fields before continuing.
          </div>
        )}
        <div className={styles.field}>
          <label htmlFor="full-name">Full name</label>
          <input ref={nameRef} id="full-name" name="name" autoComplete="name" required minLength={2} maxLength={80} value={values.name} onChange={(event) => update('name', event.target.value)} aria-required="true" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? 'name-error' : undefined} placeholder="Your name" />
          {errors.name && <p className={styles.error} id="name-error">{errors.name}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="email">Email address</label>
          <input ref={emailRef} id="email" name="email" type="email" autoComplete="email" required value={values.email} onChange={(event) => update('email', event.target.value)} aria-required="true" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? 'email-error' : undefined} placeholder="you@example.com" />
          {errors.email && <p className={styles.error} id="email-error">{errors.email}</p>}
        </div>
        <div className={styles.field}>
          <label htmlFor="program">Program interest</label>
          <select ref={programRef} id="program" name="program" required value={values.program} onChange={(event) => update('program', event.target.value)} aria-required="true" aria-invalid={Boolean(errors.program)} aria-describedby={errors.program ? 'program-error' : undefined}>
            <option value="">Select a program</option>
            {programs.map((program) => <option key={program.name} value={program.name}>{program.name}</option>)}
          </select>
          {errors.program && <p className={styles.error} id="program-error">{errors.program}</p>}
        </div>
        <div className={styles.formBottom}>
          <div className={styles.consentField}>
            <input ref={consentRef} id="consent" name="consent" type="checkbox" required checked={values.consent} onChange={(event) => update('consent', event.target.checked)} aria-required="true" aria-invalid={Boolean(errors.consent)} aria-describedby={errors.consent ? 'consent-error' : undefined} />
            <label htmlFor="consent">I agree to be contacted about my enquiry.</label>
            {errors.consent && <p className={styles.error} id="consent-error">{errors.consent}</p>}
          </div>
          <button className={styles.submitButton} type="submit">Send enquiry</button>
        </div>
        {submitted && <p className={styles.success} role="status" aria-live="polite">Thanks for your interest. Your enquiry has been checked on this page. No message has been sent.</p>}
      </form>
    </section>
  );
}
