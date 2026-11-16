#[derive(Debug, PartialEq)]
pub enum HostError { Incompatible, CapabilityDenied }

pub struct PluginManifest { pub api_version: u16, pub capabilities: Vec<&'static str> }

pub fn register(manifest: &PluginManifest, supported: u16) -> Result<(), HostError> {
 if manifest.api_version != supported { return Err(HostError::Incompatible); }
 if manifest.capabilities.iter().any(|c| !matches!(*c, "read_event" | "emit_metric")) { return Err(HostError::CapabilityDenied); }
 Ok(())
}
