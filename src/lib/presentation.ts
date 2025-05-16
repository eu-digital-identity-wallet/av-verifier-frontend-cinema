import { v4 as uuidv4 } from 'uuid';

const verifierUrl = import.meta.env.VITE_VERIFIER_BASE_URL;

export async function CreatePresentationRequest() {
  const presentationRequest = {
    type: 'vp_token',
    presentation_definition: {
      id: uuidv4(),
      input_descriptors: [
        {
          id: 'eu.europa.ec.agev10n',
          format: {
            mso_mdoc: {
              alg: ['ES256', 'ES384', 'ES512', 'EdDSA'],
            },
          },
          constraints: {
            limit_disclosure: 'required',
            fields: [
              {
                path: [`$['eu.europa.ec.agev10n']['age_over_18']`],
                intent_to_retain: false,
              },
            ],
          },
        },
      ],
    },
    nonce: uuidv4(),
  };
  console.log('presentationRequest:', presentationRequest);
  const response = await fetch(verifierUrl + '/ui/presentations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(presentationRequest),
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data = await response.json();
  return data;
}

export async function GetPresentationState(transactionID: string) {
  const response = await fetch(
    verifierUrl + `/ui/presentations/${transactionID}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  if (response.status === 200) {
    console.log('response:', await response.json());
    return true;
  } else {
    return false;
  }
}
