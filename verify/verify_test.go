package verify

import "testing"

func TestRejectsWrongAudience(t *testing.T) {
 if Validate(Claims{Audience:"other", ExpiresAt:10, Nonce:"n"}, "api", 1, func(string) bool{return false}) == nil { t.Fatal("accepted") }
}
func TestRejectsReplay(t *testing.T) {
 if Validate(Claims{Audience:"api", ExpiresAt:10, Nonce:"n"}, "api", 1, func(string) bool{return true}) == nil { t.Fatal("accepted") }
}
