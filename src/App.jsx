import { useState, useEffect } from 'react'
import confetti from 'canvas-confetti'
import './App.css'

function App() {
  const [semCount, setSemCount] = useState(3)
  const [kolCount, setKolCount] = useState(3)
  const [semScores, setSemScores] = useState(Array(3).fill(''))
  const [kolScores, setKolScores] = useState(Array(3).fill(''))
  const [absent, setAbsent] = useState('')
  const [totalHours, setTotalHours] = useState('')
  const [serbest, setSerbest] = useState('')
  const [result, setResult] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  useEffect(() => {
    setSemScores(Array(semCount).fill(''))
  }, [semCount])

  useEffect(() => {
    setKolScores(Array(kolCount).fill(''))
  }, [kolCount])

  const handleSemScoreChange = (index, value) => {
    const newScores = [...semScores]
    newScores[index] = value
    setSemScores(newScores)
  }

  const handleKolScoreChange = (index, value) => {
    const newScores = [...kolScores]
    newScores[index] = value
    setKolScores(newScores)
  }

  const hesabla = () => {
    // Seminar
    const semTotal = semScores.reduce((sum, score) => sum + (Number(score) || 0), 0)
    const semAvg = semTotal / semCount
    const semFinal = semAvg * 0.4

    // Kollokvium
    const kolTotal = kolScores.reduce((sum, score) => sum + (Number(score) || 0), 0)
    const kolAvg = kolTotal / kolCount
    const kolFinal = kolAvg * 0.6

    // (Seminar + Kollokvium) * 3
    const basliqBal = (semFinal + kolFinal) * 3

    // Davamiyyət
    const totalHoursNum = Number(totalHours) || 0
    const absentNum = Number(absent) || 0
    const davamiyyet = totalHoursNum > 0 ? 10 - (10 * absentNum / totalHoursNum) : 10

    // Sərbəst iş
    const serbestBal = Number(serbest) || 0

    // Ümumi bal
    const totalPoint = basliqBal + davamiyyet + serbestBal

    setResult(totalPoint.toFixed(2))
    setShowPopup(true)

    // Trigger confetti if score is above 45
    if (totalPoint >= 45) {
      confetti({
        particleCount: 200,
        spread: 90,
        origin: { y: 0.6 }
      })
    }
  }

  const resetForm = () => {
    setSemCount(3)
    setKolCount(3)
    setSemScores(Array(3).fill(''))
    setKolScores(Array(3).fill(''))
    setAbsent('')
    setTotalHours('')
    setSerbest('')
    setResult(null)
    setShowPopup(false)
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">
          <span className="icon">📊</span>
          Semestr Balı Hesablama
        </h1>

        <div className="section">
          <div className="section-header">
            <span className="section-icon">📝</span>
            <h2>Seminar</h2>
          </div>
          <div className="form-group">
            <label>Seminar sayı seç:</label>
            <select 
              value={semCount} 
              onChange={(e) => setSemCount(Number(e.target.value))}
              className="select-input"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="inputs-grid">
            {semScores.map((score, index) => (
              <input
                key={index}
                type="number"
                placeholder={`Seminar ${index + 1}`}
                value={score}
                onChange={(e) => handleSemScoreChange(index, e.target.value)}
                className="score-input"
                min="0"
                max="10"
              />
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <span className="section-icon">📚</span>
            <h2>Kollokvium</h2>
          </div>
          <div className="form-group">
            <label>Kollokvium sayı seç:</label>
            <select 
              value={kolCount} 
              onChange={(e) => setKolCount(Number(e.target.value))}
              className="select-input"
            >
              {[...Array(10)].map((_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
          <div className="inputs-grid">
            {kolScores.map((score, index) => (
              <input
                key={index}
                type="number"
                placeholder={`Kollokvium ${index + 1}`}
                value={score}
                onChange={(e) => handleKolScoreChange(index, e.target.value)}
                className="score-input"
                min="0"
                max="10"
              />
            ))}
          </div>
        </div>

        <div className="section">
          <div className="section-header">
            <span className="section-icon">⏰</span>
            <h2>Davamiyyət və Sərbəst İş</h2>
          </div>
          <div className="form-group">
            <label>Buraxılan saat:</label>
            <input
              type="number"
              value={absent}
              onChange={(e) => setAbsent(e.target.value)}
              className="input"
              placeholder="0"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Dərsin ümumi saatı:</label>
            <input
              type="number"
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
              className="input"
              placeholder="0"
              min="0"
            />
          </div>
          <div className="form-group">
            <label>Sərbəst iş (0–10):</label>
            <input
              type="number"
              value={serbest}
              onChange={(e) => setSerbest(e.target.value)}
              className="input"
              placeholder="0"
              min="0"
              max="10"
            />
          </div>
        </div>

        <div className="button-group">
          <button onClick={hesabla} className="btn btn-primary">
            <span>✓</span> Hesabla
          </button>
          <button onClick={resetForm} className="btn btn-secondary">
            <span>↻</span> Sıfırla
          </button>
        </div>

        {result !== null && (
          <div className="result">
            <div className="result-label">Toplam Bal</div>
            <div className="result-score">{result}</div>
          </div>
        )}
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
            <h2 className="popup-title">Nəticə</h2>
            <div className="popup-score">{result}</div>
            <div className="popup-label">Toplam Bal</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
