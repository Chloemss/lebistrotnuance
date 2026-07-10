import { useState } from 'react'
import './Faq.css'

interface FaqItem {
  q: string
  a: string
}

const FAQS: FaqItem[] = [
  {
    q: 'Faut-il réserver pour venir ?',
    a: 'La réservation est recommandée, surtout le week-end et pour les groupes de plus de 4 personnes. Les petites tablées peuvent tenter leur chance sans réservation, mais nous vous conseillons d\'appeler avant de vous déplacer.',
  },
  {
    q: 'Les jeux sont-ils en accès libre ?',
    a: 'Oui — fléchettes, shuffleboard et jeux de société sont en accès libre pour tous les clients attablés. Le karaoké privatif, lui, se réserve à l\'avance.',
  },
  {
    q: 'Peut-on privatiser le lieu pour un événement ?',
    a: 'Absolument. Le Bistrot des Nuances se privatise entièrement pour vos anniversaires, séminaires, afterworks et événements d\'entreprise, jusqu\'à 80 personnes. Contactez-nous pour un devis personnalisé.',
  },
  {
    q: 'Y a-t-il un parking à proximité ?',
    a: 'Plusieurs parkings gratuits sont accessibles à moins de 5 minutes à pied — notamment sur l\'Avenue de la Libération et dans les rues adjacentes du village.',
  },
  {
    q: 'Les enfants sont-ils les bienvenus ?',
    a: 'Le Bistrot des Nuances est un lieu familial et convivial. Nous accueillons les familles avec plaisir, surtout en journée et en début de soirée.',
  },
  {
    q: 'Proposez-vous des options végétariennes ?',
    a: 'Oui, notre carte propose plusieurs plats végétariens clairement identifiés. N\'hésitez pas à demander à votre serveur, qui peut adapter certains plats selon vos préférences.',
  },
  {
    q: 'Quels modes de paiement acceptez-vous ?',
    a: 'Espèces, cartes bancaires (Visa, Mastercard) et tickets restaurant (Swile, Edenred, Sodexo). Le paiement sans contact est disponible.',
  },
  {
    q: 'Les animaux sont-ils acceptés ?',
    a: 'Les animaux sont les bienvenus en terrasse. L\'accès à l\'intérieur est malheureusement réservé aux humains.',
  },
]

export default function Faq() {
  const [open, setOpen] = useState<number | null>(null)

  const toggle = (i: number) => setOpen(open === i ? null : i)

  return (
    <section className="Faq">
      <div className="Faq__inner">

        {/* ── Colonne gauche ── */}
        <div className="Faq__left">
          <span className="Faq__label">FAQ</span>
          <h2 className="Faq__title">Des<br />questions ?</h2>
          <p className="Faq__intro">
            Tout ce que vous voulez savoir avant de pousser la porte.
          </p>
          <a href="#reservation" className="Faq__cta">Nous contacter →</a>
        </div>

        {/* ── Accordion ── */}
        <div className="Faq__list">
          {FAQS.map((item, i) => (
            <div
              key={i}
              className={`Faq__item${open === i ? ' is--open' : ''}`}
            >
              <button
                className="Faq__question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{item.q}</span>
                <span className="Faq__icon" aria-hidden="true">
                  {open === i ? '−' : '+'}
                </span>
              </button>

              <div className="Faq__answer-wrap">
                <div className="Faq__answer">
                  <p>{item.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
