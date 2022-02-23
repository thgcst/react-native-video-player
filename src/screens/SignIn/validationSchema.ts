import * as yup from 'yup';

export default yup.object().shape({
  email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
  password: yup
    .string()
    .min(6, 'Mínimo de 6 dígitos')
    .required('Campo obrigatório'),
});
