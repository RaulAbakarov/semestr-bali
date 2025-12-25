import { useState, useEffect, useCallback, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import confetti from 'canvas-confetti'
import { calculateAttendance } from '../utils/attendanceTable'
import './Calculator.css'

const STORAGE_KEY = 'semestr_bali_subjects_v1'

// Safe UUID generator with fallback
const generateId = () => {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// Safe localStorage operations
const loadSubjects = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch (error) {
    console.error('Failed to load subjects:', error)
    return []
  }
}

const saveSubjects = (subjects) => {
  try {
    // Use requestIdleCallback for non-blocking save
    if (typeof requestIdleCallback !== 'undefined') {
      requestIdleCallback(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects))
      })
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(subjects))
    }
  } catch (error) {
    console.error('Failed to save subjects:', error)
  }
}

function Calculator() {
  const { t } = useTranslation()
  const [subjectName, setSubjectName] = useState('')
  const [semCount, setSemCount] = useState(3)
  const [kolCount, setKolCount] = useState(3)
  const [semScores, setSemScores] = useState(Array(3).fill(''))
  const [kolScores, setKolScores] = useState(Array(3).fill(''))
  const [absent, setAbsent] = useState('')
  const [totalHours, setTotalHours] = useState('60')
  const [serbest, setSerbest] = useState('')
  const [result, setResult] = useState(null)
  const [showPopup, setShowPopup] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)
  const [showErrorPopup, setShowErrorPopup] = useState(false)
  
  // Saved subjects state
  const [savedSubjects, setSavedSubjects] = useState([])
  const [editingId, setEditingId] = useState(null)

  // Load saved subjects on mount
  useEffect(() => {
    setSavedSubjects(loadSubjects())
  }, [])

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index)
  }

  useEffect(() => {
    setSemScores(Array(semCount).fill(''))
  }, [semCount])

  useEffect(() => {
    setKolScores(Array(kolCount).fill(''))
  }, [kolCount])

  const handleSemScoreChange = useCallback((index, value) => {
    setSemScores(prev => {
      const newScores = [...prev]
      newScores[index] = value
      return newScores
    })
  }, [])

  const handleKolScoreChange = useCallback((index, value) => {
    setKolScores(prev => {
      const newScores = [...prev]
      newScores[index] = value
      return newScores
    })
  }, [])

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
    
    // Use rule-based attendance calculation
    const attendanceResult = calculateAttendance(totalHoursNum, absentNum)
    
    if (!attendanceResult.allowedToExam) {
      setShowErrorPopup(true)
      setResult(null)
      setShowPopup(false)
      return
    }
    
    const davamiyyet = attendanceResult.score

    const serbestBal = Number(serbest) || 0

    const totalPoint = basliqBal + davamiyyet + serbestBal
    const calculatedResult = totalPoint.toFixed(2)

    setResult(calculatedResult)
    setShowPopup(true)

    if (totalPoint >= 45) {
      // Reduce particle count on mobile for better performance
      const isMobile = window.innerWidth < 768
      confetti({
        particleCount: isMobile ? 100 : 200,
        spread: 90,
        origin: { y: 0.6 },
        disableForReducedMotion: true
      })
    }

    // Save subject if name is provided
    const trimmedName = subjectName.trim()
    if (trimmedName.length > 0) {
      const inputs = {
        semCount,
        kolCount,
        semScores: [...semScores],
        kolScores: [...kolScores],
        absent,
        totalHours,
        serbest
      }

      let updatedSubjects
      if (editingId) {
        // Update existing subject
        updatedSubjects = savedSubjects.map(subject =>
          subject.id === editingId
            ? { ...subject, subjectName: trimmedName, result: calculatedResult, inputs, updatedAt: Date.now() }
            : subject
        )
        setEditingId(null)
      } else {
        // Add new subject (most recent first)
        const newSubject = {
          id: generateId(),
          subjectName: trimmedName,
          result: calculatedResult,
          inputs,
          createdAt: Date.now()
        }
        updatedSubjects = [newSubject, ...savedSubjects]
      }

      setSavedSubjects(updatedSubjects)
      saveSubjects(updatedSubjects)
      
      // Clear only subject name after saving
      setSubjectName('')
    }
  }

  const resetForm = () => {
    setSemCount(3)
    setKolCount(3)
    setSemScores(Array(3).fill(''))
    setKolScores(Array(3).fill(''))
    setAbsent('')
    setTotalHours('60')
    setSerbest('')
    setResult(null)
    setShowPopup(false)
    setShowErrorPopup(false)
    setSubjectName('')
    setEditingId(null)
  }

  const handleEdit = useCallback((subject) => {
    // Set editing mode first
    setEditingId(subject.id)
    
    // Load subject data into form
    setSubjectName(subject.subjectName)
    setAbsent(subject.inputs.absent)
    setTotalHours(subject.inputs.totalHours)
    setSerbest(subject.inputs.serbest)
    setResult(subject.result)
    
    // Set counts first, then scores in next tick to avoid useEffect overwrite
    setSemCount(subject.inputs.semCount)
    setKolCount(subject.inputs.kolCount)
    
    // Use setTimeout to ensure scores are set after useEffect runs
    setTimeout(() => {
      setSemScores(subject.inputs.semScores)
      setKolScores(subject.inputs.kolScores)
    }, 0)
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleDelete = useCallback((id) => {
    setSavedSubjects(prev => {
      const updatedSubjects = prev.filter(subject => subject.id !== id)
      saveSubjects(updatedSubjects)
      return updatedSubjects
    })
    
    // If deleting currently edited subject, exit editing mode
    setEditingId(prevId => {
      if (prevId === id) {
        setSubjectName('')
        return null
      }
      return prevId
    })
  }, [])

  const handleClearAll = useCallback(() => {
    if (window.confirm(t('calculator.confirmClearAll') || 'Are you sure you want to delete all saved subjects?')) {
      setSavedSubjects([])
      localStorage.removeItem(STORAGE_KEY)
      setSubjectName('')
      setEditingId(null)
    }
  }, [t])

  return (
    <div className="calculator-wrapper">
      {/* Introduction Section */}
      <div className="intro-section">
        <p className="intro-text">{t('calculator.intro')}</p>
      </div>

      <div className="card">
        <h1 className="title">
          <img src="/logo.svg" alt="" className="title-logo" />
          {t('calculator.title')}
        </h1>

        {/* Subject Name Input */}
        <div className="subject-name-section">
          <div className="form-group">
            <label>{t('calculator.subjectName')}</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="input"
              placeholder={t('calculator.subjectNamePlaceholder')}
            />
            {editingId && (
              <div className="editing-badge">{t('calculator.editingMode')}</div>
            )}
          </div>
        </div>

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
            <label>{t('calculator.totalHours')}</label>
            <select
              value={totalHours}
              onChange={(e) => setTotalHours(e.target.value)}
              className="select-input"
            >
              <option value="30">30</option>
              <option value="45">45</option>
              <option value="60">60</option>
              <option value="75">75</option>
              <option value="90">90</option>
              <option value="105">105</option>
            </select>
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
            <span>✓</span> {editingId ? t('calculator.saveChanges') : t('calculator.calculate')}
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

      {showErrorPopup && (
        <div className="popup-overlay" onClick={() => setShowErrorPopup(false)}>
          <div className="popup-card error-popup" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close" onClick={() => setShowErrorPopup(false)}>×</button>
            <div className="error-icon">⚠️</div>
            <h2 className="popup-title error-title">{t('calculator.errorTitle')}</h2>
            <p className="error-description">{t('calculator.errorDescription')}</p>
          </div>
        </div>
      )}
      
      {/* Saved Subjects Section */}
      {savedSubjects.length > 0 && (
        <div className="saved-subjects-section">
          <div className="saved-subjects-header">
            <h2 className="saved-subjects-title">{t('calculator.savedSubjects')}</h2>
            <button onClick={handleClearAll} className="btn-clear-all">
              {t('calculator.clearAll')}
            </button>
          </div>
          <div className="saved-subjects-list">
            {savedSubjects.map((subject) => (
              <div key={subject.id} className={`saved-subject-item ${editingId === subject.id ? 'editing' : ''}`}>
                <div className="subject-info">
                  <div className="subject-name">{subject.subjectName}</div>
                  <div className="subject-result">{subject.result}</div>
                </div>
                <div className="subject-actions">
                  <button onClick={() => handleEdit(subject)} className="btn-edit">
                    {t('calculator.edit')}
                  </button>
                  <button onClick={() => handleDelete(subject.id)} className="btn-delete">
                    {t('calculator.delete')}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* FAQ Accordion Section */}
      <div className="faq-section">
        <h2 className="faq-title">{t('calculator.faqTitle')}</h2>
        
        {[1, 2, 3, 4, 5, 6].map((num) => (
          <div key={num} className="faq-item">
            <button 
              className={`faq-question ${openFaq === num ? 'active' : ''}`}
              onClick={() => toggleFaq(num)}
            >
              {t(`calculator.faqQ${num}`)}
              <span className="faq-icon">{openFaq === num ? '−' : '+'}</span>
            </button>
            {openFaq === num && (
              <div className="faq-answer">
                {t(`calculator.faqA${num}`)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calculator
