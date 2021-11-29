import Novaposhta from '~/api/novaposhta'
import Firebase from '~/api/firebase'

export default (context, inject) => {
  // Initialize API factories
  const factories = {
    novaposhta: Novaposhta(context),
    fb: Firebase(context)
  };

  // Inject $api
  inject("api", factories);
};
