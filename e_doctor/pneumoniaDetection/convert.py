import tensorflow as tf
from tensorflow.keras.losses import BinaryCrossentropy

# Load model without compiling
model = tf.keras.models.load_model("model40.h5", compile=False)

# Recompile with supported loss and reduction
model.compile(
    optimizer="adam",
    loss=BinaryCrossentropy(reduction="sum_over_batch_size"),
    metrics=["accuracy"]
)

# Export to SavedModel format for deployment
model.export("model_tf")
