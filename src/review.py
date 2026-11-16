PROHIBITED = {'approve', 'deny', 'ineligible'}

def draft_answer(chunks, confidence):
    if confidence < 0.75 or not chunks: return {'status':'abstain','citations':[]}
    text = 'Review the cited policy evidence with the applicant.'
    if any(word in text.lower() for word in PROHIBITED): return {'status':'blocked','citations':[]}
    return {'status':'draft','text':text,'citations':[c['id'] for c in chunks]}
