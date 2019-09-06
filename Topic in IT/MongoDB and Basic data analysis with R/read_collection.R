read_collection <- function(x){
  mongo(collection = x, db = "MelPedTra", url = "mongodb://localhost")
}

