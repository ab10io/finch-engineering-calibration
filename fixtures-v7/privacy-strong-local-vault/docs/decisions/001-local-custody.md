# Critical design decision

Local custody avoids server plaintext and searchable metadata. Server-side search and service-held recovery keys were rejected. The accepted cost is user-owned recovery and local index rebuilds. Reconsider if target devices cannot provide secure key storage.

## Alternatives compared

| Alternative | Benefit | Rejected cost |
| --- | --- | --- |
| Server-held encryption and search | Simple recovery and cross-device search | Server compromise exposes reusable keys and searchable metadata |
| Fully peer-to-peer synchronization | No storage service metadata | Background delivery is unreliable on target mobile devices |
| Local custody with encrypted recovery export | No service receives plaintext or keys | Users own recovery and explicitly transfer encrypted bundles |

The local-custody choice is reflected in the injected key boundary, authenticated envelopes, retention checks, encrypted recovery import/export, and absence of plaintext in persisted records. Reconsider it if secure device key storage is unavailable.

## Traceability

- Compare credible custody alternatives and map the selected constraints to implementation modules. — `docs/decisions/001-local-custody.md`
- Implement local custody, bounded retention, and explicit recovery through the selected service boundary. — `src/vault/service.js`
- Compose encryption, storage, retention policy, and recovery through explicit injected interfaces. — `src/vault/service.js`
- Map assets and trust boundaries to mitigations and explicit residual risks. — `docs/security/threat-model.md`
- Authenticate encrypted envelopes and reject tampered or version-incompatible records. — `src/vault/envelope.js`
- Exercise tampered envelopes, incorrect keys, expired records, and invalid recovery inputs. — `test/vault-adversarial.test.js`
- Document prerequisites, local configuration, normal usage, and privacy boundaries. — `README.md`
- Document diagnosis, backup verification, rollback, and recovery failure procedures. — `docs/runbook.md`
- Commit a deterministic dependency lock for reproducible review. — `package-lock.json`
- Grant recognized permission to use, modify, and redistribute the project. — `LICENSE`
- Define scoped automated checks without claiming that they ran successfully. — `.github/workflows/ci.yml`
- Document contribution boundaries, review expectations, and security-sensitive changes. — `CONTRIBUTING.md`
