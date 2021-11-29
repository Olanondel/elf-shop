import Novaposhta from '~/api/novaposhta'
import firebase from 'firebase/compat'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    novaposhta: Novaposhta(context)
  };

  console.log(context)

  // Inject $api
  inject("api", factories);
};
