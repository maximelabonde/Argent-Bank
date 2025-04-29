import { Account, Profile } from '../components'

export function User() {
  const accountData = [
    {
      title: 'Argent Bank Checking (x8349)',
      amount: '$2,082.79',
      text: 'Available Balance',
    },
    {
      title: 'Argent Bank Savings (x6712)',
      amount: '$10,928.42',
      text: 'Available Balance',
    },
    {
      title: 'Argent Bank Credit Card (x8349)',
      amount: '$184.30',
      text: 'Current Balance',
    },
  ]

  return (
    <main className="main bg-dark">
      <Profile />
      <h2 className="sr-only">Accounts</h2>
      {accountData.map((data, index) => (
        <Account
          key={index}
          title={data.title}
          amount={data.amount}
          text={data.text}
        />
      ))}
    </main>
  )
}
