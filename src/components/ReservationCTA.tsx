import './ReservationCTA.css'

interface ReservationCTAProps { onReserve: () => void }

export default function ReservationCTA({ onReserve }: ReservationCTAProps) {
  return (
    <section className="rcta">
      <div className="rcta__inner">
        <div className="rcta__deco">🎉</div>
        <h2 className="rcta__title">Alors, on réserve&nbsp;?</h2>
        <p className="rcta__sub">
          Une table au restaurant, une partie de jeux entre amis ou un événement de groupe —
          il y a forcément une bonne raison de venir chez Wine Bar.
        </p>
        <div className="rcta__buttons">
          <button className="btn btn--yellow btn--lg" onClick={onReserve}>Réserver une table</button>
          <button className="btn btn--outline btn--lg"  onClick={onReserve}>Réserver un jeu</button>
        </div>
        <p className="rcta__note">Ouvert du mardi au dimanche — Services midis et soirs</p>
      </div>
    </section>
  )
}
