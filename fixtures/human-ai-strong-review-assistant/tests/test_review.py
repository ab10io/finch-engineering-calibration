from src.review import draft_answer

def test_abstains_below_threshold(): assert draft_answer([{'id':'p1'}], .4)['status'] == 'abstain'
def test_cites_supported_draft(): assert draft_answer([{'id':'p1'}], .9)['citations'] == ['p1']
