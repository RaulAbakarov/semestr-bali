// Attendance scoring table based on university rules
// Each course has a fixed total-hour category with specific absence limits
// "qayib saatı" (q) = absent hours

export const attendanceTable = {
  // 30 SAAT
  30: {
    scores: {
      1: 9,
      2: 9,
      3: 8,
    },
    maxAllowed: 3 // 4q and above = not allowed to exam
  },

  // 45 SAAT
  45: {
    scores: {
      1: 10,
      2: 9,
      3: 9,
      4: 8,
      5: 8,
    },
    maxAllowed: 5 // 6q and above = not allowed to exam
  },

  // 60 SAAT
  60: {
    scores: {
      1: 10,
      2: 9,
      3: 9,
      4: 9,
      5: 8,
      6: 8,
      7: 8,
    },
    maxAllowed: 7 // 8q and above = not allowed to exam
  },

  // 75 SAAT
  75: {
    scores: {
      1: 10,
      2: 9,
      3: 9,
      4: 9,
      5: 9,
      6: 9,
      7: 8,
      8: 8,
    },
    maxAllowed: 8 // 9q and above = not allowed to exam
  },

  // 90 SAAT
  90: {
    scores: {
      1: 10,
      2: 10,
      3: 9,
      4: 9,
      5: 9,
      6: 9,
      7: 8,
      8: 8,
      9: 8,
      10: 8,
      11: 8,
    },
    maxAllowed: 11 // 12q and above = not allowed to exam
  },

  // 105 SAAT
  105: {
    scores: {
      1: 10,
      2: 10,
      3: 9,
      4: 9,
      5: 9,
      6: 9,
      7: 9,
      8: 8,
      9: 8,
      10: 8,
      11: 8,
      12: 8,
    },
    maxAllowed: 12 // 13q and above = not allowed to exam
  }
};

/**
 * Calculate attendance score based on university rules
 * @param {number} totalHours - Total course hours (must be one of: 30, 45, 60, 75, 90, 105)
 * @param {number} absentHours - Number of hours absent
 * @returns {Object} { score: number, allowedToExam: boolean, message: string }
 */
export function calculateAttendance(totalHours, absentHours) {
  // Validate total hours
  if (!attendanceTable[totalHours]) {
    return {
      score: 0,
      allowedToExam: false,
      message: 'Invalid total hours. Must be one of: 30, 45, 60, 75, 90, 105'
    };
  }

  const category = attendanceTable[totalHours];
  
  // Check if absent hours exceed maximum allowed
  if (absentHours > category.maxAllowed) {
    return {
      score: 0,
      allowedToExam: false,
      message: 'Exceeded maximum allowed absences. Not allowed to take exam.'
    };
  }

  // Check if this specific absence count has a defined score
  if (category.scores[absentHours] === undefined) {
    return {
      score: 0,
      allowedToExam: false,
      message: 'This absence count is not allowed. Not allowed to take exam.'
    };
  }

  // Return the fixed score for this absence count
  return {
    score: category.scores[absentHours],
    allowedToExam: true,
    message: 'OK'
  };
}
