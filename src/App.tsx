import { useState } from 'react'
import type { FormEvent } from 'react'
import './App.css'

type Guest = {
  name: string
  email: string
  companions: number
  note: string
}

const eventDate = 'Sábado 14 de febrero de 2027 · 17:00 hs'

const gallery = [
  'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1520854221256-17451cc331bf?auto=format&fit=crop&w=900&q=80',
  'https://images.unsplash.com/photo-1522673607200-164d1b6ce486?auto=format&fit=crop&w=900&q=80',
]

function App() {
  const [form, setForm] = useState<Guest>({
    name: '',
    email: '',
    companions: 0,
    note: '',
  })
  const [guests, setGuests] = useState<Guest[]>([])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setGuests((current) => [...current, form])
    setForm({ name: '', email: '', companions: 0, note: '' })
  }

  return (
    <main className="invitation">
      <header className="hero">
        <p className="eyebrow">Nos casamos</p>
        <h1>Ana & Luis</h1>
        <p className="description">
          Con mucha alegría queremos invitarte a celebrar nuestro matrimonio junto a
          nosotros y nuestras familias.
        </p>
        <p className="date">{eventDate}</p>
      </header>

      <section aria-label="Galería de fotos" className="gallery">
        {gallery.map((photo, index) => (
          <img key={photo} src={photo} alt={`Foto de boda ${index + 1}`} loading="lazy" />
        ))}
      </section>

      <section className="rsvp" aria-labelledby="rsvp-title">
        <h2 id="rsvp-title">Registro de invitados</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Nombre completo
            <input
              required
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
            />
          </label>

          <label>
            Correo electrónico
            <input
              type="email"
              required
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
          </label>

          <label>
            Acompañantes
            <input
              type="number"
              min={0}
              value={form.companions}
              onChange={(event) =>
                setForm((current) => ({ ...current, companions: Number(event.target.value) || 0 }))
              }
            />
          </label>

          <label>
            Mensaje (opcional)
            <textarea
              rows={3}
              value={form.note}
              onChange={(event) => setForm((current) => ({ ...current, note: event.target.value }))}
            />
          </label>

          <button type="submit">Confirmar asistencia</button>
        </form>

        <div className="guest-list">
          <h3>Invitados registrados ({guests.length})</h3>
          {guests.length === 0 ? (
            <p>Aún no hay registros.</p>
          ) : (
            <ul>
              {guests.map((guest, index) => (
                <li key={`${guest.email}-${index}`}>
                  <strong>{guest.name}</strong> · {guest.email} · {guest.companions} acompañantes
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </main>
  )
}

export default App
