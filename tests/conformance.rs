use plugin_kit::{register, HostError, PluginManifest};
#[test]
fn rejects_undeclared_capability() {
 let manifest = PluginManifest { api_version: 1, capabilities: vec!["filesystem"] };
 assert_eq!(register(&manifest, 1), Err(HostError::CapabilityDenied));
}
