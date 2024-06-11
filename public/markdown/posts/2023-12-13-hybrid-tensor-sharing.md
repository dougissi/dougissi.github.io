---
layout: post_with_embedding
title: Hybrid Tensor Sharing Between Serverless Functions
tags: [Machine Learning]
embedding_path: /assets/hybrid-tensor-sharing/hts_preprint.pdf
---
![Tensor Sharing AWS S3 vs Rest](/assets/images/tensor_sharing_rest_vs_s3.png)

## Motivation
At the end of my master's program at UIUC, I took a capstone course that was entirely focused around creating a novel academic research paper in the cloud computing space. Seeing as I had no formal research training, this was a daunting task. By the end, however, a classmate and I (with the guidance of our professor) produced what I believe is a quality research paper that melded both cloud computing and machine learning&mdash;two very cutting-edge topics.

## Background
Here are some overly-simplified terms that are essential to understanding our research.

**Serverless functions**: a cloud computing platform in which you can upload individual functions (code) that can then be triggered whenever you desire. Only the cloud provider has to worry about the servers (computers) on which your code actually runs, so from your perspective you don't have to think about servers at all, hence the term _serverless_. Not having to deal with servers can make your life a lot simpler, and it can also be much cheaper because you don't have to pay for servers to be running all the time.

**Machine Learning Model**: software that "learns" to answer questions. For example, some models can identify objects in images. The main idea is that you can give an image to such a model and it will respond with a list of objects it thinks are in the image. But how does this work? Well, prior to being able to make any sort of educated guesses about objects in images, it must first be _trained_, typically by providing it with many different images and telling the model what objects are in each image. The idea is similar to how you would teach a child. You might start with a picture of a baby rabbit and say, "This is a picture of a bunny." Then you might move on to a picture of a bicycle and say, "Here's a bike." The next image might be a family portrait where you say, "Here's a mom and a dad and their three kids," pointing to each as you go. While a child would process this info in his/her brain, a machine learning model uses computing power to track the many different features of the objects in each image, and thereby "learns" what features correspond to a bunny and a bike and a person. After it's been trained on enough images, it can accurately detect objects in new images&mdash;images it has not yet seen. Actually asking a question of a trained model is a process known as _inferencing_. In our work, we focus on inferencing rather than training.

**Deep Neural Network (DNN)**: a specific type of machine learning model implemented in a way that mimics a network of neurons in a human brain. Information is passed through the network in small pieces working in parallel that are eventually synthesized and combined to produce a final result. The small pieces of information are called _tensors_, and you can think of these as Excel spreadsheets full of numbers, usually several stacked together at a time. These types of models can be very big and require a lot of computing power, but they can also be scary accurate.

## Idea Behind Our Research
If you have a trained Deep Neural Network model, it'd be nice to upload it as a serverless function. That way you can let the cloud provider deal with all the server stuff, and you can simply make inference requests to the model whenever you want. Sounds nice, right? Unfortunately there are limits on how big a single serverless function can be, and many DNN models are too big. To get around that, it's possible to divide up a single DNN into coordinated smaller submodels, each being sufficiently small that it can fit in its own serverless function.

While this solves one problem, it introduces another: now these multiple serverless functions, one for each submodel, need to share tensor information between each other, and doing a lot of sharing between functions usually results in significantly increasing the DNN inferencing time.

**Our research shows that we can speed up the inferencing time in such situations if we use multiple tensor sharing methods: one method for small tensors and another for large tensors.**

## Abstract
If you've made it this far, you're now ready to read the real abstract of our paper. Hopefully I've done a good enough job that you can decipher most of what we've written here.

_"Cloud-based serverless platforms offer an efficient solution for deploying Deep Neural Networks (DNNs). These platforms handle the complex infrastructure provisioning tasks, scale dynamically, and charge developers only for the actual runtime of the inference requests. Recent research suggests that partitioning a large DNN into smaller, parallelizable submodels deployed in separate serverless functions can minimize end-to-end inference latency. This partitioned design requires sharing intermediate tensors among the coordinated serverless functions. While the current state-of-the-art system achieves this by encoding the tensor information in the payload of a REST API endpoint, our study demonstrates that using a remote object storage system for tensors exceeding a specific size threshold can facilitate faster sharing. Therefore, we propose a hybrid inter-function tensor sharing strategy based on tensor size to further decrease the end-to-end latency in partitioned DNN models. Our experimental results indicate that implementing this hybrid strategy can reduce latency by up to 17.3%."_

## Research Paper
Embedded below is our full research paper. Navigate <a href="{{ page.embedding_path }}" target="_blank">here</a> for a full-page view.