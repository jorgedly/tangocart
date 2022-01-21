provider "google" {
    credentials = file("./sa.json")
}

resource "google_container_cluster" "clustersa" {
  name = var.name
  project = var.project
  description = "Descripcion de cluster"
  location = var.location

  enable_legacy_abac = true
  remove_default_node_pool = true
  initial_node_count = var.initial_node_count

  master_auth {
    username = ""
    password = ""

    client_certificate_config {
        issue_client_certificate = false
    }
  }
}

resource "google_container_node_pool" "npsa" {
  name = "${var.name}-node-pool"
  project = var.project
  location = var.location
  cluster = google_container_cluster.clustersa.name
  node_count = var.initial_node_count

  node_config {
    preemptible = true
    machine_type = var.machine_type

    metadata = {
      disable-legacy-endpoints = "true"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring"
    ]

  }
}
