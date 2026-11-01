// TEMP-UNCONFIRMED: committee has not yet confirmed publication of these details.

export interface DonationBankData {
  accountHolder: string;
  iban: string;
  bic: string;
  reference: string;
  contactEmail: string;
}

export const donationBankData: DonationBankData = {
  accountHolder: 'Dhammaduta Myanmar Buddhist Center Germany e.V.',
  iban: 'DE88500502010200860240',
  bic: 'HELADEF1822',
  reference: 'Spende Buddhachaya',
  contactEmail: 'info@buddhachaya.com'
};
