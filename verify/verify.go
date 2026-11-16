package verify

import "errors"

type Claims struct { Audience string; ExpiresAt int64; Nonce string }

func Validate(c Claims, expected string, now int64, seen func(string) bool) error {
 if c.Audience != expected { return errors.New("audience_mismatch") }
 if c.ExpiresAt <= now { return errors.New("expired") }
 if c.Nonce == "" || seen(c.Nonce) { return errors.New("replay") }
 return nil
}
