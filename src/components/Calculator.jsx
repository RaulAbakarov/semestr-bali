import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import confetti from 'canvas-confetti'
import './Calculator.css'

function Calculator() {
  const { t } = useTranslation()
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
    const semTotal = semScores.reduce((sum, score) => sum + (Number(score) || 0), 0)
    const semAvg = semTotal / semCount
    const semFinal = semAvg * 0.4

    const kolTotal = kolScores.reduce((sum, score) => sum + (Number(score) || 0), 0)
    const kolAvg = kolTotal / kolCount
    const kolFinal = kolAvg * 0.6

    const basliqBal = (semFinal + kolFinal) * 3

    const totalHoursNum = Number(totalHours) || 0
    const absentNum = Number(absent) || 0
    const davamiyyet = totalHoursNum > 0 ? 10 - (10 * absentNum / totalHoursNum) : 10

    const serbestBal = Number(serbest) || 0

    const totalPoint = basliqBal + davamiyyet + serbestBal

    setResult(totalPoint.toFixed(2))
    setShowPopup(true)

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
    <div className="calculator-wrapper">
      <div className="card">
        <h1 className="title">
          <span className="icon">📊</span>
          {t('calculator.title')}
        </h1>

        <div className="section">
          <div className="section-header">
            <span className="section-icon">📝</span>
            <h2>{t('calculator.seminar')}</h2>
          </div>
          <div className="form-group">
            <label>{t('calculator.selectSeminarCount')}</label>
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
                placeholder={t('calculator.seminarPlaceholder', { number: index + 1 })}
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
            <h2>{t('calculator.kollokvium')}</h2>
          </div>
          <div className="form-group">
            <label>{t('calculator.selectKollokviumCount')}</label>
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
                placeholder={t('calculator.kollokviumPlaceholder', { number: index + 1 })}
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
            <h2>{t('calculator.attendanceSection')}</h2>
          </div>
          <div className="form-group">
            <label>{t('calculator.absentHours')}</label>
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
            <label>{t('calculator.totalHours')}</label>
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
            <label>{t('calculator.independentWork')}</label>
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
            <span>✓</span> {t('calculator.calculate')}
          </button>
          <button onClick={resetForm} className="btn btn-secondary">
            <span>↻</span> {t('calculator.reset')}
          </button>
        </div>

        {result !== null && (
          <div className="result">
            <div className="result-label">{t('calculator.totalScore')}</div>
            <div className="result-score">{result}</div>
          </div>
        )}
      </div>

      {showPopup && (
        <div className="popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="popup-card" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowPopup(false)}>×</button>
            <h2 className="popup-title">{t('calculator.result')}</h2>
            <div className="popup-score">{result}</div>
            <div className="popup-label">{t('calculator.totalScore')}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calculator
